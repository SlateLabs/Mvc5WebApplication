using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MVC5DataServiceInterface;

namespace MVC5EntityFrameworkDataAccess
{
   
    public class EFDataService : IDataService, IDisposable
    {

        MVC5Database _connection;

        public MVC5Database dbConnection
        {
            get { return _connection; }
        }


        public void CommitTransaction(Boolean closeSession)
        {
            dbConnection.SaveChanges();
        }

        public void RollbackTransaction(Boolean closeSession)
        {
           
        }
        
        public void Save(object entity) { }
        public void CreateSession() { _connection = new MVC5Database(); }
        public void BeginTransaction() { }

        public void CloseSession() { }

        public void Dispose()
        {
            if (_connection != null)
                _connection.Dispose();
        }
    }
}
