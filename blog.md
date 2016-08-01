---
layout: page
title: Blog
permalink: /blog/
hidetitle: true
---

{% assign post = site.posts | first %}
{% include jumbotron.html post=post %}

# Posts

{% include posts.html %}

  <p class="rss-subscribe">subscribe <a href="{{ "/feed.xml" | prepend: site.baseurl }}">via RSS</a></p>
