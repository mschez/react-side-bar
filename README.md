
# React Sidebar Component

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=mschezes%40gmail%2ecom&lc=ES&item_name=Miguel%20S%c3%a1nchez&item_number=github&no_note=0&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHostedGuest) [![npm](https://img.shields.io/npm/v/react-side-bar.svg?)](http://badge.fury.io/js/react-side-bar) [![npm](https://img.shields.io/npm/dt/react-side-bar.svg)]() [![npm](https://img.shields.io/npm/l/react-side-bar.svg)](https://opensource.org/licenses/MIT)

## Demo

Check the [demo](https://mschez.github.io/react-side-bar/public).


## Installation

You can install `react-side-bar` by executing this command:

```
npm install --save react-side-bar
```

When the installation process ends, you are ready to import `react-side-bar` to your project.


## How to Use

To use `react-side-bar` you have to import the component in your project:

```javascript
import Sidebar from 'react-side-bar';
```

You can add more properties to `react-side-bar`, see the list of available properties in [Properties](#properties) section.

### Adding a Button to Open the Sidebar

If you want to add a button for opening and closing `react-side-bar` (*hamburguer menu* for example), you need to reference the state of the sidebar, e.g.:

```javascript
constructor(props) {
  this.state = {
    opened: false // (or true)
  }
}
```

This way, there are two mandatory methods you need to define

* **onOpen** (function)
* **onClose** (function)

The purpose of this properties is to keep the *opened* property updated. To achieve this, you need to trigger `setState` to change the value of the *opened* property. For exmaple:

Close:

```javascript
() => {
  this.setState({ opened: false });
}
```

Open:

```javascript
() => {
  this.setState({ opened: true });
}
```

Moreover you can use this functions to add some extra functionality for your application, such as triggers, when opening or closing `react-side-bar`.

Once you have the object with properties, you can init the component `Sidebar`.

```javascript
<Sidebar
	bar={<div>Amazing Sidebar</div>}
	opened={this.state.opened}
	onClose={() => {
		this.setState({ opened: false })
	}}
	onOpen={() => {
		this.setState({ opened: true })
	}}
	size={300}
/>
```

Output:

<img src="doc/images/screenshot1.png" width="200">
<img src="doc/images/screenshot2.png" width="200">

To add content for the application you just have to add children inside `Sidebar`.

```javascript
<Sidebar>
	<div className='topBar'>SIDEBAR</div>
	<div className='main'>Main</div>
</SideBar>
```

With style and some improvements, it could be like this:

<img src="doc/images/screenshot3.png" width="200">
<img src="doc/images/screenshot4.png" width="200">

With `react-side-bar` you can pass the topBar component (passed as a children in the example above) as a property to change the effect when opening.

```javascript
<Sidebar
	bar={<div>Amazing Sidebar</div>}
	topBar={<div className='topBar'>SIDEBAR</div>}
	size={300}
>
	<div className='main'>
		Main
	</div>
</SideBar>
```

<img src="doc/images/screenshot5.png" width="200">
<img src="doc/images/screenshot6.png" width="200">


## Properties

#### duration (*number*)
> Default: *150*

This is the time it takes to open or close the sidebar.

#### fx (*string*)
> Default: *cubic-bezier(0, 1, 0.85, 1)*

This is the effect of the sidebar when opening, o can test the default effect in [http://cubic-bezier.com](http://cubic-bezier.com/#0,1,.85,1) or perhaps add another different effect. [Effects](https://developer.mozilla.org/es/docs/Web/CSS/transition-timing-function)

#### mode (*string*: **Sidebar.BEHIND** | **Sidebar.OVER** | **Sidebar.PUSH**)
> Default: *Sidebar.OVER*

This property allows to change the opening mode of the sidebar, you can choose from three different:

* **Sidebar.BEHIND**

<img src="doc/images/behind.gif" width="200">

* **Sidebar.OVER**

<img src="doc/images/over.gif" width="200">

* **Sidebar.PUSH**

<img src="doc/images/push.gif" width="200">


#### opened (*boolean*: **true** | **false**)
> Default: *false*

This property shows or hides the sidebar. Depending on the sidebar state, its wrapper element features `class="side-bar-content opened"` or `class="side-bar-content closed"` class names.

#### side (*string*: **Sidebar.LEFT** | **Sidebar.RIGHT**)
> Default: *Sidebar.LEFT*

This property allows to change the side of the opening of the sidebar.

#### size (*number*)
> Default: *256*

This property allows to change the width of the sidebar.

#### tolerance (*number*)
> Default: *70*

This property sets the tolerance to calculate the sensibility of the automatic opening of the sidebar.

#### touch (*boolean*: **true** | **false**)
> Default: *true*

This property allows to enable or disable touch events. If its value is *false* you have to add another alternative method to open sidebar as a *hamburguer menu*.

#### touchSize (*number*)
> Default: *80*

With this property you can set the size of the touchable zone to start dragging the sidebar. The value of `0` means that you can drag the sidebar everywhere.

#### veilStyle (*object*)
> Default: *{}*

You can define the final style of the veil over the content of application when the sidebar is open. While the sidebar is opening, this style have a opacity depending of the veil opening progress.

You can also use CSS to style the veil by applying styles to `.side-bar-veil`.


## Contribution

If you want to do your own changes, share with community and contribute with the project:

```
git clone https://github.com/mschez/react-side-bar.git
cd react-side-bar
npm install
npm run dev
```

Now you can check the demo in [http://localhost:3000](http://localhost:3000)

Don't forget to check touch actions using the developer tools devices emulation.


## Important

If you like this project, don't forget buy me a beer. ¡Thank you!

[![Donate](https://www.paypalobjects.com/es_ES/ES/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=mschezes%40gmail%2ecom&lc=ES&item_name=Miguel%20S%c3%a1nchez&item_number=github&no_note=0&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHostedGuest)
