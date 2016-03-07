---
layout: post
title: The Case Against IE Specific Stylesheets
date: 2010-06-30 09:11:34.000000000 +01:00
categories:
- CSS
- Hacks
tags:
- CSS
- hacks
- Internet Explorer
- trident
- validation
- w3c
status: publish
type: post
published: true
author: "Ian Renyard"
---
In all but the most basic of web site designs developers will invariably encounter situations where Internet Explorer requires a good kick in the CSS before it’ll render the page in the desired way.  Often, a quick fix is applied in the shape of an IE specific external stylesheet, hidden from other browsers with conditional comments:

~~~
<!--[if IE]><link href="ie.css" type="text/css" rel="stylesheet" /><![endif]-->
~~~

This does the job, but there are a number of down sides to this approach, which in my opinion, make it the wrong choice in many circumstances for both user experience and code maintainability.

The main reasons for using conditional stylesheets are to avoid CSS hacks and create a smaller code footprint for standards compliant browsers.  But are these really problems that need fixing?

## Validation

HTML validation is good practice, mainly due to a loss in semantic meaning as well as the lack of consistency with regard to error handling in the standards and implementations.  However, CSS is purely presentational and does not convey any semantic meaning.  Furthermore, the original CSS standard defines strict parsing rules which dictate exactly how to deal with invalid rules.  Well tested and widely used hacks such as the * and _ hacks are extremely unlikely to cause problems in standards compliant browsers.

Invalid CSS hidden from modern browsers and the validator is still just that - invalid CSS.  Hiding invalid code within conditional comments does not make it valid, it merely prevents subsets of the code from being validated.

## Performance

While standards compliant browsers will be spared the IE specific rules in conditional stylesheets, Internet Explorer users will incur code bloat, in the shape of duplicated selectors, as well as an extra HTTP request.  This extra request may also delay the loading of other resources on the page as IE7 and below will only download 2 resources in parallel (http://support.microsoft.com/kb/282402).

If these hacks are included in the main stylesheet, standards compliant browsers will take a small hit in terms of download size, but with a bit of care this should be negligible.  However, Internet Explorer users, the majority for most sites, will see a small benefit.

## Maintainability

For the developer, IE specific stylesheets can cause issues when trying to trace the origin of CSS rules applied to a particular element. I tend to use Chrome's developer tools to quickly trace the rule back to file and line number, but this method quickly leads to a wild goose chase when IE specific styles come into play. Including IE specific rules side by side with other rules makes it immediatly obvious where they are used and enables the use of any dev tool, such as Chrome or Firebug's DOM inspector, to trace the origin of a particular rule.  I also use comments to make it even clearer what rule the hack is emulating as below:

~~~ css
#container {
  min-height: 150px;
  /*min*/_height: 150px;
}
~~~

After dropping IE specific stylesheets in favour of the * and _ hacks for my last few projects, I see fewer and fewer compelling reasons to go back to the so called good practice of IE specific styles.  In fact, I find IE specific stylesheets encourage bad practice - when faced with a rather empty looking, I am tempted to add a quick hack to it rather than tackle the real problem!
