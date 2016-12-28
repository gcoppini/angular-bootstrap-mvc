using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CVC.Produto.Web.Controllers
{
    public class ViajaNetAppViewController : Controller
    {
        public ActionResult Load(string viewUrl)
        {
            if (!viewUrl.StartsWith("~"))
            {
                viewUrl = "~" + viewUrl;
            }

            return View(viewUrl);
        }
    }
}