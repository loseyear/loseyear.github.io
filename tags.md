---
layout: page
title: Tags
permalink: /tags/
---


{% for category in site.tags %}
  <a href="#{{ category | first }}">{{ category | first }}</a>
    ({{ category | last | size }})
{% endfor %}

<div class="home">
    {% for category in site.tags %}
        <h1 class="page-heading">
            <a name="{{ category | first }}">{{ category | first }} ({{ category | last | size }})</a>
        </h1>
        <ul class="post-list">
            {% for post in category.last %}
                <li>
                    <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>
                    <h2>
                        <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
                    </h2>
                </li>
            {% endfor %}
        </ul>
    {% endfor %}
</div>


