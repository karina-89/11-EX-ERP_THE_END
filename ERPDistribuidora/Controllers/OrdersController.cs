using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ERPDistribuidora.Data;
using ERPDistribuidora.Models;
using Microsoft.AspNetCore.Authorization;

namespace ERPDistribuidora.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly DataContext _context;

        public OrdersController(DataContext context)
        {
            _context = context;
        }

        // GET: api/CabPedidos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders.Include(o => o.Customer).Include(e => e.Employee).ToListAsync();
        }

        [HttpGet("cust/{id}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByCustomer(int id)
        {
            return await _context.Orders.Include(o => o.Customer).Include(e => e.Employee).Where(o => o.CustomerId == id).ToListAsync();
        }

        [HttpGet("emp/{id}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByEmployee(int id)
        {
            return await _context.Orders.Include(o => o.Customer).Include(e => e.Employee).Where(o => o.EmployeeId == id).ToListAsync();
        }

        // GET: api/CabPedidos/5
        [HttpGet("{id}")]
            public async Task<ActionResult<Order>> GetOrder(int id, bool includeLines = false)
            {
                Order order;

                if (includeLines)
                {
                    order = await _context.Orders.Include(o => o.Customer).Include(e => e.Employee).Include(o => o.OrderLines).SingleOrDefaultAsync(o => o.Id == id);
                }
                else
                {
                    order = await _context.Orders.Include(o => o.Customer).Include(e => e.Employee).SingleOrDefaultAsync(o => o.Id == id);
                }

                if (order == null)
                {
                    return NotFound();
                }

                return Ok(order);
            }

            private async Task CreateOrEditOrderLines(IEnumerable<OrderLine> orderLines)
            {
                List<OrderLine> linesToCreate = orderLines.Where(x => x.Id == 0).ToList();
                List<OrderLine> linesToEdit = orderLines.Where(x => x.Id != 0).ToList();

                if (linesToCreate.Any())
                {
                    await _context.AddRangeAsync(linesToCreate);
                }

                if (linesToEdit.Any())
                {
                    _context.UpdateRange(linesToEdit);
                }
            }

            // PUT: api/CabPedidos/5
            // To protect from overposting attacks, enable the specific properties you want to bind to, for
            // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
            [HttpPut("{id}")]
            public async Task<IActionResult> PutCabPedido(int id, Order cabPedido)
            {
                if (id != cabPedido.Id)
                {
                    return BadRequest();
                }

                _context.Entry(cabPedido).State = EntityState.Modified;

                try
                {
                    await CreateOrEditOrderLines(cabPedido.OrderLines);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    if (!CabPedidoExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw ex;
                    }
                }

                return NoContent();
            }

            // POST: api/CabPedidos
            // To protect from overposting attacks, enable the specific properties you want to bind to, for
            // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
            [HttpPost]
            public async Task<ActionResult<Order>> PostCabPedido(Order cabPedido)
            {
                _context.Orders.Add(cabPedido);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetCabPedido", new { id = cabPedido.Id }, cabPedido);
            }

            // DELETE: api/CabPedidos/5
            [HttpDelete("{id}")]
            public async Task<ActionResult<Order>> DeleteCabPedido(int id)
            {
                var cabPedido = await _context.Orders.FindAsync(id);
                if (cabPedido == null)
                {
                    return NotFound();
                }

                _context.Orders.Remove(cabPedido);
                await _context.SaveChangesAsync();

                return cabPedido;
            }

            private bool CabPedidoExists(int id)
            {
                return _context.Orders.Any(e => e.Id == id);
            }
        }
    }
