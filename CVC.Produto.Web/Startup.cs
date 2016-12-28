using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(CVC.Produto.Web.Startup))]
namespace CVC.Produto.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
