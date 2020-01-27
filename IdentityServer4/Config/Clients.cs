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
                    AllowedScopes = new List<string> { "customAPI.read" }
                },
                new Client
                {
                    ClientId = "js1",
                    ClientName = "JavaScript Client 1",
                    AllowedGrantTypes = GrantTypes.Code,
                    RequirePkce = true,
                    RequireClientSecret = false,

                    RedirectUris =           { "https://localhost:44336/callback-signin.html" },
                    PostLogoutRedirectUris = { "https://localhost:44336/callback-signout.html" },
                    AllowedCorsOrigins =     { "https://localhost:44336" },

                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "customAPI.read"
                    }
                },
                new Client
                {
                    ClientId = "js2",
                    ClientName = "JavaScript Client 2",
                    AllowedGrantTypes = GrantTypes.Code,
                    RequirePkce = true,
                    RequireClientSecret = false,

                    RedirectUris =           { "https://localhost:44370/callback-signin.html" },
                    PostLogoutRedirectUris = { "https://localhost:44370/callback-signout.html" },
                    AllowedCorsOrigins =     { "https://localhost:44370" },

                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "customAPI.read"
                    }
                }
            };
        }
    }
}
