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
    public class OrderLinesController : ControllerBase
    {
        private readonly DataContext _context;

        public OrderLinesController(DataContext context)
        {
            _context = context;
        }

        // GET: api/LinPedidos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderLine>>> GetLinPedidos()
        {
            return await _context.OrderLines.ToListAsync();
        }

        // GET: api/LinPedidos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderLine>> GetLinPedido(int id)
        {
            var linPedido = await _context.OrderLines.FindAsync(id);

            if (linPedido == null)
            {
                return NotFound();
            }

            return linPedido;
        }

        // PUT: api/LinPedidos/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLinPedido(int id, OrderLine linPedido)
        {
            if (id != linPedido.OrderId)
            {
                return BadRequest();
            }

            _context.Entry(linPedido).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LinPedidoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/LinPedidos
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<OrderLine>> PostLinPedido(OrderLine linPedido)
        {
            _context.OrderLines.Add(linPedido);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (LinPedidoExists(linPedido.OrderId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetLinPedido", new { id = linPedido.OrderId }, linPedido);
        }

        // DELETE: api/LinPedidos/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<OrderLine>> DeleteLinPedido(int id)
        {
            var linPedido = await _context.OrderLines.FindAsync(id);
            if (linPedido == null)
            {
                return NotFound();
            }

            _context.OrderLines.Remove(linPedido);
            await _context.SaveChangesAsync();

            return linPedido;
        }

        [HttpPost("delete/list")]
        public async Task<IActionResult> DeleteList([FromBody] IEnumerable<OrderLine> orderLines)
        {
            try
            {
                _context.OrderLines.RemoveRange(orderLines); ;
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }

            return Ok();
        }

        private bool LinPedidoExists(int id)
        {
            return _context.OrderLines.Any(e => e.OrderId == id);
        }
    }
}
