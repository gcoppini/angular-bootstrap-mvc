using System.Web;
using System.Web.Optimization;

namespace CVC.Produto.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.IgnoreList.Clear();

            //VENDOR RESOURCES

            //~/Bundles/App/vendor/css
            bundles.Add(
                new StyleBundle("~/Bundles/App/vendor/css")
                    .Include("~/Content/bootstrap.min.css")
                );

            //~/Bundles/App/vendor/js
            bundles.Add(
                new ScriptBundle("~/Bundles/App/vendor/js")
                    .Include(
                        "~/Scripts/angular.min.js",
                        "~/Scripts/i18n/angular-locale_pt-br.js",
                        "~/Scripts/angular-animate.min.js",
                        "~/Scripts/angular-sanitize.min.js",
                        "~/Scripts/angular-aria.min.js",
                        "~/Scripts/angular-ui-router.min.js",

                        "~/Scripts/angular-ui/ui-bootstrap.min.js",
                        "~/Scripts/angular-ui/ui-bootstrap-tpls.min.js",
                        "~/Scripts/angular-ui/ui-utils.min.js",
                        "~/Scripts/angular-ui/ui-utils-ieshiv.min.js",

                        "~/CVC/Framework/scripts/CVC.js",
                        "~/CVC/Framework/scripts/libs/angularjs/CVC.ng.js"
                    )
            );



            //~/Bundles/App/Main/css
            bundles.Add(
                new StyleBundle("~/Bundles/App/Main/css")
                    .IncludeDirectory("~/App/Main", "*.css", true)
                );

            //~/Bundles/App/Main/js
            bundles.Add(
                new ScriptBundle("~/Bundles/App/Main/js")
                    .IncludeDirectory("~/App/Main", "*.js", true)
                );



        }
    }
}
