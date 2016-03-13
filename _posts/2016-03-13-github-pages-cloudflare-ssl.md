---
layout: post
title:  "SSL on GitHub Pages with CloudFlare"
excerpt: "Implementing SSL on GitHub Pages hosted sites."
image: padlock.jpg
author: "Ian Renyard"
date: 2016-03-13
categories: github ssl
---

With online security constantly in the news and more and more web services moving to secure connections only, users are starting to expect sites to offer SSL as a default. For sites which request user data or payment information, the need for security is obvious, but to a lesser extent it's also advantageous for static sites and blogs.

## Why Use SSL For Static Sites?

If your site is not requesting user data or payment information, the main advantage to implementing SSL is to mitigate the risk of man in the middle attacks. Even for a static site, there are risks to being open to a MITM attack.

A MITM has the ability to add arbitrary code to your site. This technique can (and has) been used by WiFi providers, mobile carriers and internet service providers to include ads, promotional messaging or user tracking on third party sites. With SSL enabled, it is not possible for the MITM to make changes to the code delivered to the user's browser.

## What Options Are Available For SSL on GitHub Pages?

Out of the box, sites hosted on GitHub Pages can be loaded over HTTPS, but will only present a valid certificate when being served over the _username_.github.io domain. If you're using a custom domain, you'll need another solution.

For this site, I've used [CloudFlare](https://cloudflare.com) to host my DNS and provide CDN facilities. As part of this they also offer SSL between them and the end user. This means CloudFlare will fetch the files from your site insecurely over HTTP or over HTTPS without validating the github.io certificate and serve them to your users over a trusted SSL connection.

## Setup

Once you've added your domain to your CloudFlare account, enabling SSL is as simple as switching it on in the crypto area of the account dashboard. There are several options, but for GitHub Pages based sites which cannot serve a valid certificate for your domain, the "Full" option will give you the best balance of security and functionality.

## Pros and Cons of this Setup

It should be noted that this setup doesn't provide full end-to-end encryption between the user and your site, meaning that the connection between CloudFlare and your site should not be considered secure. Therefore this is not suitable for any site that requests user data or logins, but on static GitHub Pages sites, this shouldn't be a problem.

For static sites though, I'd say this trade off is preferable to having no SSL at all. It provides a level of trust that the page has not been tampered with and provides protection at the stage where a MITM is most likely to be situated.

Browser support is another area that you should be aware of before implementing CloudFlare's SSL. The certificates provided on the free tier do not support many older browsers, including Internet Explorer on Windows XP and any Android device older than Ice Cream Sandwich. This roughly means that any major browser released since 2010 should be fine. Depending on your userbase and browser support policy, this may or may not be acceptable.

While this setup is not going to be suitable for all sites, it's a quick, easy and free way to implement basic SSL for a small blog or static site and is ideal for sites hosted on GitHub Pages.
