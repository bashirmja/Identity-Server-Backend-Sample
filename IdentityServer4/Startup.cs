using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace IdentityServer4
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddIdentityServer()
                .AddInMemoryClients(Config.Clients.Get())
                .AddInMemoryIdentityResources(Config.Resources.GetIdentityResources())
                .AddInMemoryApiResources(Config.Resources.GetApiResources())
                .AddTestUsers(Config.Users.Get())
                .AddDeveloperSigningCredential();

            services.AddMvc(option => option.EnableEndpointRouting = false);
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseRouting();
            app.UseIdentityServer();

            app.UseStaticFiles();
            app.UseMvcWithDefaultRoute();

        }
    }
}
