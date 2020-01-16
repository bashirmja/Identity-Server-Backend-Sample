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
                SubjectId = "5BE86359-073C-434B-AD2D-A3932222DABE",
                Username = "bashir",
                Password = "123",
                Claims = new List<Claim> {
                    new Claim(JwtClaimTypes.Email, "bashir.momen@amcsgroup.com"),
                    new Claim(JwtClaimTypes.Role, "admin")
                }
            },
            new TestUser {
                SubjectId = "67294cd7-819a-4c8e-b801-116ce3deb24c",
                Username = "Jesper",
                Password = "abc123",
                Claims = new List<Claim> {
                    new Claim(JwtClaimTypes.Email, "jesper@amcsgroup.com"),
                    new Claim(JwtClaimTypes.Role, "admin")
                }
            }
        };
        }
    }
}
