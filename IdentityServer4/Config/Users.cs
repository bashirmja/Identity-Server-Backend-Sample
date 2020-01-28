using IdentityModel;
using IdentityServer4.Test;
using System.Collections.Generic;
using System.Security.Claims;

namespace Config
{
    internal class Users
    {
        public static List<TestUser> Get()
        {
            return new List<TestUser> {
            new TestUser {
                SubjectId = "5BE86359",
                Username = "bashir",
                Password = "123",
                Claims = new List<Claim> {
                    new Claim(JwtClaimTypes.Email, "bashir.momen@amcsgroup.com"),
                    new Claim(JwtClaimTypes.Role, "admin"),
                    new Claim(JwtClaimTypes.NickName, "Bashir Momen")

                }
            },
            new TestUser {
                SubjectId = "67294cd7",
                Username = "test",
                Password = "123",
                Claims = new List<Claim> {
                    new Claim(JwtClaimTypes.Email, "testuser@amcsgroup.com"),
                    new Claim(JwtClaimTypes.Role, "user"),
                    new Claim(JwtClaimTypes.NickName, "test user")
                }
            }
        };
        }
    }
}
