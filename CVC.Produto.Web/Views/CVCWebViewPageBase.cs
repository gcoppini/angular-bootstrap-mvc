using System.Web.Mvc;

namespace CVC.Produto.Web.Views
{
    public abstract class CVCWebViewPageBase : CVCWebViewPageBase<dynamic>
    {

    }

    public abstract class CVCWebViewPageBase<TModel> : WebViewPage<TModel>
    {

        public string ApplicationPath
        {
            get {
                return Request.ApplicationPath;
            }
        }
        protected CVCWebViewPageBase()
        {
        }

  

    }
}