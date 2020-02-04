using IdentityServer4;
using IdentityServer4.Models;
using System.Collections.Generic;

namespace Config
{
    internal class Clients
    {
        public static IEnumerable<Client> Get()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientId = "Postman Client",
                    ClientName = "Example Client Credentials Client Application",
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPasswordAndClientCredentials,
                    ClientSecrets = new List<Secret> { new Secret("superSecretPassword".Sha256()) },
                    AllowedScopes = new List<string> { "ApiScope" }
                },
                new Client
                {
                    ClientId = "jsClient",
                    ClientName = "JavaScript Client",
                    AllowedGrantTypes = GrantTypes.Code,
                    RequireClientSecret = false,
                    RequireConsent=false,
                    RedirectUris =
                    {
                        "http://localhost:4200/auth-callback",
                        "http://localhost:4200/silent-refresh.html",

                        "https://localhost:44336/callback-signin.html",
                        "https://localhost:44336/callback-silent.html"
                    },
                    PostLogoutRedirectUris =
                    {
                        "https://localhost:44336/callback-signout.html",
                        
                        "http://localhost:4200/"
                    },
                    AllowedCorsOrigins =     {
                        "http://localhost:4200",
                        "https://localhost:44336"
                    },


                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "ApiScope"
                    }
                }
            };
        }
    }
}
