using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace WorkoutManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            string m_strMySQLConnectionString = "server=localhost;userid=WorkoutManagerAdmin;database=WorkoutManager;password=Workout2020";

            try
            {
                string strQueryGetValue = "select Name from Workout where id = 1";
                string strValue = GetValueFromDBUsing(strQueryGetValue, m_strMySQLConnectionString);
                return new string[] { strValue };
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message.ToString());
            }

            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        private string GetValueFromDBUsing(string strQuery, string m_strMySQLConnectionString)
        {
            string strData = "";

            try
            {
                if (string.IsNullOrEmpty(strQuery) == true)
                    return string.Empty;

                using (var mysqlconnection = new MySqlConnection(m_strMySQLConnectionString))
                {
                    mysqlconnection.Open();
                    using (MySqlCommand cmd = mysqlconnection.CreateCommand())
                    {
                        cmd.CommandType = CommandType.Text;
                        cmd.CommandTimeout = 300;
                        cmd.CommandText = strQuery;

                        object objValue = cmd.ExecuteScalar();
                        if (objValue == null)
                        {
                            cmd.Dispose();
                            return string.Empty;
                        }
                        else
                        {
                            strData = (string)cmd.ExecuteScalar();
                            cmd.Dispose();
                        }

                        mysqlconnection.Close();

                        if (strData == null)
                            return string.Empty;
                        else
                            return strData;
                    }
                }
            }
            catch (MySqlException ex)
            {
                Console.WriteLine(ex);
                return string.Empty;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return string.Empty;
            }
            finally
            {

            }
        }
    }
}
