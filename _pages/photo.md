---
layout: page
title: Photos
permalink: /photos/
description:
nav: true
display_categories: [2025,2024,2023,2022,2021,2020]
---
<div class="projects">
  {% if site.enable_project_categories and page.display_categories %}
  <!-- Display categorized projects -->
    {% for category in page.display_categories %}
      <h2 class="category">{{ category }}</h2>
      {% assign categorized_projects = site.photo | where: "category", category %}
      {% assign sorted_projects = categorized_projects | sort: "importance" %}
      <!-- Generate cards for each project -->
      <div class="grid">
        {% for project in sorted_projects %}
          {% include photo.html %}
        {% endfor %}
      </div>
    {% endfor %}

  {% else %}
  <!-- Display projects without categories -->
    {% assign sorted_projects = site.photo | sort: "importance" %}
    <!-- Generate cards for each project -->
    <div class="grid">
      {% for project in sorted_projects %}
        {% include photo.html %}
       {% endfor %}      
    </div>
  {% endif %}

</div>