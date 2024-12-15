---
title: JWT and Session
date: 2024-12-13
tags:
  - Authentication
---
I always use NextAuth.js in my projects. Every time I use it, Claude gives me code like this:
```typescript
callbacks: {
jwt({ token, user }) {
if (user) {
token.id = user.id;
token.role = user.role;
token.firstName = user.firstName;
token.lastName = user.lastName;
}
return token;
},
session({ session, token }) {
session.user.id = token.sub;
session.user.role = token.role;
session.user.firstName = token.firstName;
session.user.lastName = token.lastName;
return session;
}
```
so I wondered what it meant. After learning, I understood the following:

Firstly, the default JWT structure is like this:
```typescript
interface DefaultJWT {
  name?: string | null
  email?: string | null
  picture?: string | null
  sub?: string // Subject (user ID)
  iat?: number // Issued at (timestamp)
  exp?: number // Expiry (timestamp)
  jti?: string // JWT ID
}
```
But as you can see above, we extend it to include more information. In this case, the JWT structure becomes:
```typescript
interface CustomJWT extends DefaultJWT {
id: string
role: string
firstName: string
lastName: string
}
```
Then we get a token, which is a encrypted string based on those attributes. BTW, a token is composed of an encoded header, an encoded payload and a signature, with this information stored in the payload.

I was curious about why we encrypt user data to create the token. Actually, it's for the session mechanism. Let's dive deeper.

After the user signs in, NextAuth.js creates a JWT for them and stores it in cookies. Every time a user initiates an authenticated request, the token is included to let the Server identify the user.

But what if we want to use user data during the interaction (e.g., checking the user's role before allowing certain behavious)? 

Sure, we could query the user data from the database repeatedly, but that's a bad idea. Instead, since the JWT contains this data, why not use it?

[![](https://mermaid.ink/img/pako:eNpVkF1rwjAUhv9KONdV2qbaNhcDtboxhrDpGCz14mAyK7NJl6RsTvzvi1UH5uKQ8-Z5z0cOsNZCAoONwaYiy6JUxJ8Rf3xbklHTGI3rakV6vTsy5hOtHG6VJa9WGlKgw9UZH3fAhM81KcbkuZVmT-ZSCilugILP0DryIm2jlZWXt3Occu-8bTjj50pTr3jTVyutu3hmHXB_8jxpFDfqA1_s9Lcf8L8PBFBLU-NW-EUPJ7YEV8lalsD8VaD5LKFUR89h6_Rir9bAnGllAEa3m-qatI1AJ4st-s-qgX3gznq1QfWudX2FfArsAD_AoijvD9JhPEhomtKU5lkAe2Ax7SdhSpMoynLqxZAeA_jtKoT9PMrTbJjTMMySOM4Gxz-Dqnwu?type=png)](https://mermaid.live/edit#pako:eNpVkF1rwjAUhv9KONdV2qbaNhcDtboxhrDpGCz14mAyK7NJl6RsTvzvi1UH5uKQ8-Z5z0cOsNZCAoONwaYiy6JUxJ8Rf3xbklHTGI3rakV6vTsy5hOtHG6VJa9WGlKgw9UZH3fAhM81KcbkuZVmT-ZSCilugILP0DryIm2jlZWXt3Occu-8bTjj50pTr3jTVyutu3hmHXB_8jxpFDfqA1_s9Lcf8L8PBFBLU-NW-EUPJ7YEV8lalsD8VaD5LKFUR89h6_Rir9bAnGllAEa3m-qatI1AJ4st-s-qgX3gznq1QfWudX2FfArsAD_AoijvD9JhPEhomtKU5lkAe2Ax7SdhSpMoynLqxZAeA_jtKoT9PMrTbJjTMMySOM4Gxz-Dqnwu)
When we use `const session = await getServerSession(authOptions)` on the Server side, the Server simply decodes the JWT(using NEXTAUTH_SECRET) to extract the data. On the Client side, when we use `const { data: session, status } = useSession()` , the browser retrieves the session from the cache(or fetches it from the Server), and the Server decodes it to return the session data.

[![](https://mermaid.ink/img/pako:eNq9VFFvmzAQ_iuWpUqblCYQkgJ-6MuiTZo2aWq6Tap4ceGWWAk2s822Lsp_3xkDpYW8jhfj-87H93135kRzVQBl1MDPGmQOG8F3mpeZJPjw3CpNvhrQfl9xbUUuKi4teXcUIO04vgX9ayp_wy1_5AbGyMfv9xPllToImCpvjFAykx66uiKf1E5I8v6ofvuQo3t9e-v5MQ97xIcQ8xwZ2daPpcBvaSgQEPxofKLHMbEjzcg3fhQFtzBwowOvBxUd2gCvCqFG5r7jKtyrA8hXuJeLjNBweHakxQdytnWeowXkDkylpLOzN-LOtdDYxgrypj1qRAFvXxjTi29WNLrEQli7O3-B2QewI16trg24IZrU1bar196376U6R42RL1pZyC0USEraZrouiGs7ORbX2eTXgbjPqu6mdTQGC16JBa_tfmEm6P0nC_oGe3gwRC3fyzbRGS1Bl1wUeJFP7lBG7R5KyCjD14LrQ0YzecY8VKm2TzKnzOoaZlSrerfvNnXlJrz9A1D2A-8DRvHaPShVdkm4pexE_1AWhul8Hd8s16sojqM4SpMZfaJsGc1XQRytwjBJIwwG0XlG_zYVgnkapnFyk0ZBkKyWy2R9_gdVd3jD?type=png)](https://mermaid.live/edit#pako:eNq9VFFvmzAQ_iuWpUqblCYQkgJ-6MuiTZo2aWq6Tap4ceGWWAk2s822Lsp_3xkDpYW8jhfj-87H93135kRzVQBl1MDPGmQOG8F3mpeZJPjw3CpNvhrQfl9xbUUuKi4teXcUIO04vgX9ayp_wy1_5AbGyMfv9xPllToImCpvjFAykx66uiKf1E5I8v6ofvuQo3t9e-v5MQ97xIcQ8xwZ2daPpcBvaSgQEPxofKLHMbEjzcg3fhQFtzBwowOvBxUd2gCvCqFG5r7jKtyrA8hXuJeLjNBweHakxQdytnWeowXkDkylpLOzN-LOtdDYxgrypj1qRAFvXxjTi29WNLrEQli7O3-B2QewI16trg24IZrU1bar196376U6R42RL1pZyC0USEraZrouiGs7ORbX2eTXgbjPqu6mdTQGC16JBa_tfmEm6P0nC_oGe3gwRC3fyzbRGS1Bl1wUeJFP7lBG7R5KyCjD14LrQ0YzecY8VKm2TzKnzOoaZlSrerfvNnXlJrz9A1D2A-8DRvHaPShVdkm4pexE_1AWhul8Hd8s16sojqM4SpMZfaJsGc1XQRytwjBJIwwG0XlG_zYVgnkapnFyk0ZBkKyWy2R9_gdVd3jD)
During user sign-in or any authenticated query, this callback function gets executed.
```typescript
callbacks: {
jwt({ token, user }) {
if (user) {
token.id = user.id;
token.role = user.role;
token.firstName = user.firstName;
token.lastName = user.lastName;
}
return token;
},
session({ session, token }) {
session.user.id = token.sub;
session.user.role = token.role;
session.user.firstName = token.firstName;
session.user.lastName = token.lastName;
return session;
}
```
if the user is signing in, user is a object from the database, and a new JWT will be created. If not, user is null, and the existing JWT is returned. But a session is created every time.
[![](https://mermaid.ink/img/pako:eNp9kT1vwjAQQP-KdTOg2A7kY6hUEiq1QwdAqtSEwRA3RCQOtWMBBf57HRIKKrSefHfvzn72HhZlwsGHVLL1Ek3DWCCzlJ43iRjGPNU5k2jMPzVXFXrKy00MDVavRxK1pRnqdh_QkEQvb1MUsDyfs8VqdiGHpAYOWnGJhM7zAwrq3kpLgUbbTFWZSJHpvWoJTi0oJNGEK5WV4t7csIFGJAokZxVHr3yDWr7FuEhuxCZZKtCzuBXCUVtqhfCfQvgixGsBZZTw9S1-2eDGBv9r00Cjnzl3TGIBHSi4LFiWmL_b16UYqiUveAy-2SZMrmqno-GYrsrJTizAr6TmHZClTpfnQK8Tc0aYMfMqBfgfLFcmu2bivSyLM2RC8PewBR9jr9d3BqRvU8ehDvXcDuzAJ7RnWw61MXY9apIWPXbg6zTB6nnYc9yBRy3LtQlx-8dvHUC5ew?type=png)](https://mermaid.live/edit#pako:eNp9kT1vwjAQQP-KdTOg2A7kY6hUEiq1QwdAqtSEwRA3RCQOtWMBBf57HRIKKrSefHfvzn72HhZlwsGHVLL1Ek3DWCCzlJ43iRjGPNU5k2jMPzVXFXrKy00MDVavRxK1pRnqdh_QkEQvb1MUsDyfs8VqdiGHpAYOWnGJhM7zAwrq3kpLgUbbTFWZSJHpvWoJTi0oJNGEK5WV4t7csIFGJAokZxVHr3yDWr7FuEhuxCZZKtCzuBXCUVtqhfCfQvgixGsBZZTw9S1-2eDGBv9r00Cjnzl3TGIBHSi4LFiWmL_b16UYqiUveAy-2SZMrmqno-GYrsrJTizAr6TmHZClTpfnQK8Tc0aYMfMqBfgfLFcmu2bivSyLM2RC8PewBR9jr9d3BqRvU8ehDvXcDuzAJ7RnWw61MXY9apIWPXbg6zTB6nnYc9yBRy3LtQlx-8dvHUC5ew)