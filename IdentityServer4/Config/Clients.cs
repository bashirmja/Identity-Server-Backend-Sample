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
                    ClientId = "oauthClient",
                    ClientName = "Example Client Credentials Client Application",
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPasswordAndClientCredentials,
                    ClientSecrets = new List<Secret> { new Secret("superSecretPassword".Sha256()) },
                    AllowedScopes = new List<string> { "customAPI.read" }
                },
                new Client
                {

                    ClientId = "my-client",
                    ClientName = "My Client",
                    AllowedGrantTypes = GrantTypes.ImplicitAndClientCredentials,
                    AllowAccessTokensViaBrowser = true,
                    AllowRememberConsent = true,
                    ClientSecrets = new List<Secret> { new Secret("superSecretPassword".Sha256()) },
                    RequirePkce = true,
                    RequireConsent = false,
                    AlwaysIncludeUserClaimsInIdToken = true,
                    AlwaysSendClientClaims = true,
                    AllowedScopes =
                      {
                          IdentityServerConstants.StandardScopes.OpenId,
                          IdentityServerConstants.StandardScopes.Profile,
                          IdentityServerConstants.StandardScopes.Email,
                          "customAPI.read"
                      },
                    RedirectUris = { "http://localhost:57484/login" },
                    PostLogoutRedirectUris = { "http://localhost:57484/logout" },
                    AllowedCorsOrigins = { "http://localhost:57484" },
                },
                new Client
                {
                    ClientId = "js",
                    ClientName = "JavaScript Client",
                    AllowedGrantTypes = GrantTypes.Code,
                    RequirePkce = true,
                    RequireClientSecret = false,

                    RedirectUris =           { "http://localhost:44307/callback.html" },
                    PostLogoutRedirectUris = { "http://localhost:44307/index.html" },
                    AllowedCorsOrigins =     { "http://localhost:44307" },

                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "api1"
                    }
                }
            };
        }
    }
}
