
# React Sidebar Component

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=mschezes%40gmail%2ecom&lc=ES&item_name=Miguel%20S%c3%a1nchez&item_number=github&no_note=0&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHostedGuest) [![npm](https://img.shields.io/npm/v/react-side-bar.svg?)](http://badge.fury.io/js/react-side-bar) [![npm](https://img.shields.io/npm/dt/react-side-bar.svg)]() [![npm](https://img.shields.io/npm/l/react-side-bar.svg)](https://opensource.org/licenses/MIT)


## Installation
You can install `react-side-bar` executing this command:

```
npm install --save react-side-bar
```
when the process ends, you are ready to import `react-side-bar` in your project.


## How to use
To use `react-side-bar` you have to import the component in your project:

```javascript
import Sidebar from 'react-side-bar';
```
Once imported you have to create an object with the props to pass to the component.
The property `bar` is mandatory because it is a **React** node with the `Sidebar`.
This property have to be a **React** element, it will be our `sidebar`.

```javascript
const sidebarProps = {
	bar: (<div>Amazing Sidebar</div>),
	size: 200
};
```
You can add more props to `react-side-bar`. You can see it in [Properties](#properties).

### Add a button to open the sidebar
If you want add a button to open/close `react-side-bar` (*hamburguer menu* for example) is needed a reference in the state of your component to expose if `react-side-bar` is open or not

```javascript
constructor(props) {
	this.state = {
		opened: false (or true)
	}
}
```
in this way, there are two properties mandatory

* **onOpen** (function)
* **onClose** (function)

The function of this properties is keep updated the property *opened* of component. For this, must call to `setState` to change the value of the property. For exmaple:

Close:

```javascript
onClose: () => {
	setState({ opened: false })
}
```

Open:

```javascript
onOpen: () => {
	setState({ opened: true })
}
```

Moreover you can use this functions to add extra functionality for your application such triggers when open or close `react-side-bar`.

The object of properties with  *onClose*, *onOpen* should be like that:

```javascript
const sidebarProps = {
	bar: (<div>Amazing Sidebar</div>),
	opened: this.state.opened,
	onClose: () => {
		setState({ opened: false })
	},
	onOpen: () => {
		setState({ opened: true })
	},
	size: 200
};
```

Once you have the object with properties, you can init the component `Sidebar`.

```javascript
<Sidebar {... sidebarProps} />
```

or:

```javascript
<Sidebar
	bar={(<div>Amazing Sidebar</div>)}
	size={300} />
```

Output:

<img src="doc/images/screenshot1.png" width="200">
<img src="doc/images/screenshot2.png" width="200">

To add content for the application you just have to add a children inside `Sidebar`.

```javascript
<Sidebar {... sidebarProps}>
	<div className='topBar'>SIDEBAR</div>
	<div className='main'>Main</div>
</SideBar>
```

With style and some improvements, it could be like that:

<img src="doc/images/screenshot3.png" width="200">
<img src="doc/images/screenshot4.png" width="200">

With `react-side-bar` you can pass the topBar component (passed as children in example above) as a property to change the effect when opening.

```javascript
const sidebarProps = {
	bar: (<div>Amazing Sidebar</div>),
	topBar: (<div className='topBar'>SIDEBAR</div>),
	size: 300
};

<Sidebar {... sidebarProps}>
	<div className='main'>Main</div>
</SideBar>
```

<img src="doc/images/screenshot5.png" width="200">
<img src="doc/images/screenshot6.png" width="200">


## Properties

#### duration (*number*)
> Default: *150*

This is the time it takes to open or close de sidebar.

#### fx (*string*)
> Default: *cubic-bezier(0, 1, 0.85, 1)*

This is the effect of the sidebar when opening, o can test the default effect in [http://cubic-bezier.com](http://cubic-bezier.com/#0,1,.85,1) or perhaps add another different effect. [Effects](https://developer.mozilla.org/es/docs/Web/CSS/transition-timing-function)

#### mode (*string*: **Sidebar.BEHIND** | **Sidebar.OVER** | **Sidebar.PUSH**)
> Default: *Sidebar.OVER*

This property allow change the opening mode of the sidebar, you can choose from three different:

* **Sidebar.BEHIND**

<img src="doc/images/behind.gif" width="200">

* **Sidebar.OVER**

<img src="doc/images/over.gif" width="200">

* **Sidebar.PUSH**

<img src="doc/images/push.gif" width="200">


#### opened (*boolean*: **true** | **false**)
> Default: *false*

This property show or hidden the sidebar.

#### side (*string*: **Sidebar.LEFT** | **Sidebar.RIGHT**)
> Default: *Sidebar.LEFT*

This property allow to change the side of the opening of the sidebar.

#### size (*number*)
> Default: *256*

This property allow change the width of the sidebar.

#### tolerance (*number*)
> Default: *70*

This property set the tolerance to calculate the sensibility of the automatic opening of the sidebar.

#### touch (*boolean*: **true** | **false**)
> Default: *true*

This property allow enable or disable touch events. If its value is *false* you have to add another alternative method to open as a *hamburguer menu*.

#### touchSize (*number*)
> Default: *80*

With this property you can set the size of the touchable zone to start to drag the sidebar. If its value is 0 means that you can drag the sidebar everywhere.

#### veilStyle (*object*)
> Default: *{}*

You can define the final style of the veil over the content of applicatio when the sidebar is open. While the sidebar is opening, this style have a opacity depending of the percent opening.


## Example

You can see the example in [Ejemplo](https://mschez.github.io/react-side-bar/example).

Or download (or clone) the project and click in `index.html` inside `example` folder.


## Contribution

If you want to do your own changes, share with community and contribute with the project:

```
git clone https://github.com/mschez/react-side-bar.git
cd react-side-bar
npm install
npm run dev
```

Now you can see the example in [http://localhost:3000](http://localhost:3000)

Don't forget enable the device in mode in your browser to test touch actions.


## Important

If you like this project, don't forget buy me a beer. ¡Thank you!

[![Donate](https://www.paypalobjects.com/es_ES/ES/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=mschezes%40gmail%2ecom&lc=ES&item_name=Miguel%20S%c3%a1nchez&item_number=github&no_note=0&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHostedGuest)