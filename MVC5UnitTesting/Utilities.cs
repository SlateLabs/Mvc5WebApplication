using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVC5UnitTesting
{
    public class Utilities
    {
        /// <summary>
        /// Get Return Message
        /// </summary>
        /// <param name="transactionMessage"></param>
        /// <returns></returns>
        public static string GetReturnMessage(List<String> transactionMessage)
        {
            string returnMessage = string.Empty;
            foreach (string message in transactionMessage)
            {
                returnMessage = returnMessage + message;
            }
            return returnMessage;
        }
    }
}
