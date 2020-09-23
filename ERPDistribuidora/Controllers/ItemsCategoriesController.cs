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
    public class ItemsCategoriesController : ControllerBase
    {
        private readonly DataContext _context;

        public ItemsCategoriesController(DataContext context)
        {
            _context = context;
        }

        // GET: api/CategoriaProductos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItemsCategory>>> GetCategoriasProducto()
        {
            return await _context.ItemsCategories.ToListAsync();
        }

        // GET: api/CategoriaProductos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ItemsCategory>> GetCategoriaProducto(int id)
        {
            var categoriaProducto = await _context.ItemsCategories.FindAsync(id);

            if (categoriaProducto == null)
            {
                return NotFound();
            }

            return categoriaProducto;
        }

        // PUT: api/CategoriaProductos/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategoriaProducto(int id, ItemsCategory categoriaProducto)
        {
            if (id != categoriaProducto.Id)
            {
                return BadRequest();
            }

            _context.Entry(categoriaProducto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoriaProductoExists(id))
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

        // POST: api/CategoriaProductos
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ItemsCategory>> PostCategoriaProducto(ItemsCategory categoriaProducto)
        {
            _context.ItemsCategories.Add(categoriaProducto);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCategoriaProducto", new { id = categoriaProducto.Id }, categoriaProducto);
        }

        // DELETE: api/CategoriaProductos/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ItemsCategory>> DeleteCategoriaProducto(int id)
        {
            var categoriaProducto = await _context.ItemsCategories.FindAsync(id);
            if (categoriaProducto == null)
            {
                return NotFound();
            }

            _context.ItemsCategories.Remove(categoriaProducto);
            await _context.SaveChangesAsync();

            return categoriaProducto;
        }

        private bool CategoriaProductoExists(int id)
        {
            return _context.ItemsCategories.Any(e => e.Id == id);
        }
    }
}
