using ERPDistribuidora.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ERPDistribuidora.Helpers
{
    public static class ExtensionMethods
    {
        public static IEnumerable<Employee> WithoutPasswords(this IEnumerable<Employee> users)
        {
            if (users == null) return null;

            return users.Select(x => x.WithoutPassword());
        }

        public static Employee WithoutPassword(this Employee user)
        {
            if (user == null) return null;

            user.Password = null;
            return user;
        }
    }
}
