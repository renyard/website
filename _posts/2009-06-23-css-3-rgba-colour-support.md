---
layout: post
title: CSS 3 RGBa Colour Support
date: 2009-06-23 21:39:54.000000000 +01:00
categories:
- CSS
tags:
- alpha transparency
- CSS
- css3
- filter
- gecko
- ie
- opera
- RGBa
- trident
- w3c
- webkit
status: publish
type: post
published: true
author: "Ian Renyard"
---
Developers have long been using PNGs to create semi-transparent backgrounds showing content through from underneath.  There are, however, a number of disadvantages to this technique.  It causes another HTTP request to the server, sometimes causing the page to be, momentarily, unreadable if the background colour does not work well with the text colour and, of course, IE6's lack of native support for semi-transparency in PNG24 or PNG8.

CSS 3 introduces RGBa colours, which enable alpha transparency in any rule which usually accepts an RGB colour and simply extends the same syntax.  Currently a solid red background would be set:

```
background-color:rbg(255,0,0);
```

This can now be given an alpha transparency by defining the colour as rgba and simply adding an opacity value on to the end:

```
background-color:rbga(255,0,0,0.8);
```

The above gives a solid red background with 80% opacity.  If you're using a browser with CSS 3 RGBa support, you'll be able to see an example below set against a black and white background.

<style type="text/css">
.black {
background-color:rgb(0,0,0);
}
.red	{
background-color:rgba(255,0,0,0.8);
}
</style>
<div class="black" style="width:300px; height:150px;">
<div class="red" style="position:relative; left:150px; width:300px; height:150px;">
</div>
</div>

<p><code><br />
&lt;style type="text/css"&gt;<br />
.black {<br />
background-color:rgb(0,0,0);<br />
}<br />
.red	{<br />
background-color:rgba(255,0,0,0.8);<br />
}<br />
&lt;/style&gt;<br />
&lt;div class="black" style="width:300px; height:150px;"&gt;<br />
&lt;div class="red" style="position:relative; left:150px; width:300px; height:150px;"&gt;<br />
&lt;/div&gt;<br />
&lt;/div&gt;<br />
</code></p>

### Browser Support

Firefox and Safari introduced support for RGBa colours with version 3, both of which are relatively mature in the market.  Opera has added support in version 10, which is currently in beta, and, being based on webkit, Chrome has had support from the word go.

Notably absent from the party is Internet Explorer, so is all this effort wasted if we still need to provide the old semi-transparent PNG in order for large swathes of our users to see all this swishy transparency?

Luckily for us, IE supports a proprietary filter which we can use as a workaround to give an identical effect and has done since version 6!  The gradient filter requires a start and end colour in RGBa hex format.  By using the same colour as a start and end, we can create a solid background with the semi-transparency preserved:

```
filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr=#ccff0000,endColorStr=#ccff0000);
```

As you can see from the example, one thing to note here is that alpha value here comes first.  If you're view this in IE, you should be able to see my <span style="text-decoration: line-through;">beautiful</span> example below

<style type="text/css">
.black2 {
background-color:rgb(0,0,0);
}
.red2	{
background-color:rgba(255,0,0,0.8);
}
</style>
<div class="black2" style="width:300px; height:150px;">
<div class="red2" style="position:relative; left:150px; width:300px; height:150px; filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr=#ccff0000,endColorStr=#ccff0000);">
</div>
</div>

<p><code><br />
&lt;style type="text/css"&gt;<br />
.black {<br />
background-color:rgb(0,0,0);<br />
}<br />
.red	{<br />
background-color:rgba(255,0,0,0.8);<br />
}<br />
&lt;/style&gt;<br />
&lt;!--[IF IE]&gt;<br />
&lt;style type="text/css"&gt;<br />
.red	{<br />
filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr=#ccff0000,endColorStr=#ccff0000);<br />
}<br />
&lt;style&gt;<br />
&lt;![ENDIF]--&gt;<br />
&lt;div class="black" style="width:300px; height:150px;"&gt;<br />
&lt;div class="red" style="position:relative; left:150px; width:300px; height:150px;"&gt;<br />
&lt;/div&gt;<br />
&lt;/div&gt;<br />
</code></p>

### The End of 1x1 transparent PNGs?

So, does this mean we can finally implement semi-transparent backgrounds to our content without those pesky PNGs?  As always, it all depends on the browser share and needs of your individual site, but according to [Net Applications report from May 2009](http://marketshare.hitslink.com/browser-market-share.aspx?qprid=2&amp;qpmr=40&amp;qpdt=1&amp;qpct=3&amp;qpcal=1&amp;qptimeframe=M&amp;qpsp=124&amp;qpnp=1), over 90% of users are running a browser capable of CSS 3 or filter based RGBa background colours.

In most situations, a semi-transparent background is used to make text easier to read on a more complex background.  In this case it would usually be acceptable to gracefully degrade those browsers to a solid background colour and forgo the PNG altogether.  Just add an RGB background colour before the RGBa colour and give IE a transparent background as it will use it's own filter instead:

<style type="text/css">
.black3 {
background-color:rgb(0,0,0);
}
.red3	{
background-color:rgb(255,0,0);
background-color:rgba(255,0,0,0.8);
}
</style>

<p><!--[IF IE]></p>
<style type="text/css">
div.red3	{<br />
background:transparent !important;<br />
filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr=#ccff0000,endColorStr=#ccff0000);<br />
}<br />
</style>
<p><!--< ![ENDIF]--></p>
<div class="black3" style="width:300px; height:150px;">
<div class="red3" style="position:relative; left:150px; width:300px; height:150px;">
</div>
</div>
<p><code><br />
&lt;style type="text/css"&gt;<br />
.black {<br />
background-color:rgb(0,0,0);<br />
}<br />
.red	{<br />
background-color:rgb(255,0,0);<br />
background-color:rgba(255,0,0,0.8);<br />
}<br />
&lt;/style&gt;<br />
&lt;!--[IF IE]&gt;<br />
&lt;style type="text/css"&gt;<br />
.red	{<br />
background-color:transparent;<br />
filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr=#ccff0000,endColorStr=#ccff0000);<br />
}<br />
&lt;style&gt;<br />
&lt;![ENDIF]--&gt;<br />
&lt;div class="black" style="width:300px; height:150px;"&gt;<br />
&lt;div class="red" style="position:relative; left:150px; width:300px; height:150px;"&gt;<br />
&lt;/div&gt;<br />
&lt;/div&gt;<br />
</code></p>
