---
layout: page
title: Projects
permalink: /projects/
description: A showcase of BAELAB's innovative projects.
nav: true
nav_order: 3
horizontal: false
---

<div class="projects">
  {% assign projects = site.projects | where: "category", "projects" %}
  {% assign sorted_projects = projects | reverse %}
  <div class="table-responsive">
    <table class="table table-sm table-borderless">
      <thead>
        <tr>
          <th scope="col" style="width: 25%">Date</th>
          <th scope="col">Title</th>
        </tr>
      </thead>
      <tbody>
      {% for project in sorted_projects %}
      <tr>
          <th scope="row" style="width: 15%">
            {{ project.start_date | date: '%Y' }}
            {% if project.end_date %}
            ~ {{ project.end_date | date: '%Y' }}
            {% endif %}
          </th>
          <td>
            {% if project.inline %}
              <a>{{ project.title }}</a>
            {% else %}
              <a class="news-title" href="{{ project.url | relative_url }}">{{ project.title }}</a>
            {% endif %}
            {% if project.author %}
              <br><small class="text-muted">by {{ project.author }}</small>
            {% endif %}
          </td>
        </tr>
    {% endfor %}
      </tbody>
    </table>
  </div>
</div>