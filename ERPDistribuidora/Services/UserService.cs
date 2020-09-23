using ERPDistribuidora.Data;
using ERPDistribuidora.Helpers;
using ERPDistribuidora.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ERPDistribuidora.Services
{
    public interface IUserService
    {
        Employee Authenticate(string username, string password);
        IEnumerable<Employee> GetAll();
        Employee GetById(int id);
    }

    public class UserService : IUserService
    {
        private DataContext _context;

        public UserService(DataContext context)
        {
            _context = context;
        }

        public Employee Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            var employee = _context.Employees.SingleOrDefault(x => x.UserName == username && x.Password == password);

            // return null if user not found
            if (employee == null) return null;

            return employee;
        }

        public IEnumerable<Employee> GetAll()
        {
            return _context.Employees;
        }

        public Employee GetById(int id)
        {
            return _context.Employees.Find(id);
        }
    }
}
