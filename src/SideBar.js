
import React from 'react';

import decouple from 'decouple';

const CONTENT_DEFAULT_STYLE = {
  position: 'relative'
};

const MENU_DEFAULT_STYLE = {
  bottom: 0,
  left: 0,
  MozOverflowScrolling: 'touch',
  OOverflowScrolling: 'touch',
  overflowY: 'auto',
  overflowScrolling: 'touch',
  position: 'absolute',
  top: 0,
  WebkitOverflowScrolling: 'touch',
  zIndex: 0
};

const PANEL_DEFAULT_STYLE = {
  position: 'relative',
  zIndex: 1
};

const VEIL_INITIAL_STYLE = {
  bottom: 0,
  left: 0,
  position: 'absolute',
  right: 0,
  top: 0
};

const VEIL_DEFAULT_PROPS = {
  opacity: 0.5
};

const VEIL_DEFAULT_STYLE = {
  backgroundColor: 'black'
};

// Definition of modes
const BEHIND = 'behind';
const OVER = 'over';
const PUSH = 'push';

// Definition of sides
const LEFT = 'left';
const RIGHT = 'right';

const buildTransform = (duration, fx) => {
  return 'transform ' + duration + 'ms ' + fx;
};

const buildTranslate3d = translateX => {
  return 'translate3d(' + translateX + 'px, 0, 0)';
};

const prefixes = [ 'Moz', 'ms', 'O', 'WebKit' ];
const extendWithPrefix = (object = {}, property, value) => {
  const prefixObj = {};

  prefixObj[property.toLowerCase()] = value;
  prefixes.map(prefix => {prefixObj[prefix + property] = value; return; });
  return Object.assign(object, prefixObj);
};

class SideBar extends React.Component {

  constructor(props) {
    super(props);
    this.displayName = 'SideBar';

    this.state = {
      _alpha: props.veilStyle.opacity || VEIL_DEFAULT_PROPS.opacity,
      _currentOffsetX: 0,
      _moved: false,
      _opening: false,
      _orientation: this.getOrientation(),
      _preventOpen: false,
      _scrolling: false,
      _startOffsetX: 0,
      _transform: '',
      _transition: '',
      _translateTo: this.getOrientation() * parseInt(props.size, 10),
      _translateX: 0,
      opened: props.opened
    };
  }

  componentDidMount() {
    this.initTouchEvents();
  }

  componentWillReceiveProps(nextProps = {}) {
    if (nextProps.hasOwnProperty('opened')) {
      if (nextProps.opened === true) {
        this.open();
      } else {
        this.close();
      }
    }
    if (nextProps.hasOwnProperty('size')) {
      this.setState({
        _translateTo: this.getOrientation() * parseInt(nextProps.size, 10)
      });
    }
    if (nextProps.hasOwnProperty('side')) {
      this.setState({
        _orientation: this.getOrientation(nextProps.side),
        _translateTo:
          this.getOrientation(nextProps.side) * parseInt(nextProps.size, 10)
      });
    }
  }

  close() {
    if (!this.isOpen() && !this.state._opening) return;

    this.setTransition();
    this.translateXTo(0);

    let newState = {
      _moved: false,
      _opening: false,
      _transition: '',
      _transform: '',
      _translateX: 0,
      opened: false
    };

    window.setTimeout(() => {
      this.setState(newState);
    }, this.props.duration + 50);
  }

  getOrientation(side = this.props.side) {
    return side === LEFT ? 1 : -1;
  }

  getVeilOpacity() {
    const { _alpha, _currentOffsetX, _startOffsetX } = this.state;
    const { size } = this.props;
    let opacity = 0;

    if (_startOffsetX < size) {
      opacity = 0;
      if (_currentOffsetX > 0) {
        opacity = (_currentOffsetX * _alpha) / size;
      }
    } else {
      opacity = _alpha;
      if (_currentOffsetX <= 0) {
        opacity = ((size + _currentOffsetX) * _alpha) / size;
      }
    }

    if (opacity > _alpha) {
      opacity = _alpha;
    }

    if (this.props.side === RIGHT) {
      opacity = (_alpha - opacity);
    }

    return opacity;
  }

  handleClickPanel() {
    if (!this.state._opening) {
      this.close();
      if (this.props.onClose) {
        this.props.onClose();
      }
    }
  }

  initTouchEvents() {
    this.onScrollFn();
    window.document.addEventListener('touchmove', this.preventMove.bind(this));
  }

  isOpen() {
    return this.state.opened;
  }

  onScrollFn() {
    return decouple(window.document, 'scroll', () => {
      if (!this.state._moved) {
        window.clearTimeout(this.state.scrollTimeout);
        this.setState({ scrolling: true });

        let timeout = window.setTimeout(() => {
          this.setState({
            scrolling: false
          });
        }, 250);

        this.setState({ scrollTimeout: timeout });
      }
    });
  }

  onTouchCancelFn() {
    this.setState({
      _moved: false,
      _opening: false
    });
  }

  onTouchEndFn(e) {
    const { onOpen, onClose, tolerance } = this.props;

    if (this.state._moved) {
      if (this.state._opening &&
        tolerance < (this.state._orientation * this.state._currentOffsetX)) {
        this.open();
        if (onOpen) {
          onOpen();
        }
      } else {
        this.close();
        if (onClose) {
          onClose();
        }
      }
      this.setState({ _opening: false });
    }
  }

  onTouchMoveFn(e) {
    if (this.state._scrolling || this.state._preventOpen || !e.touches) return;

    let diffX = e.touches[0].clientX - this.state._startOffsetX;
    let translateX = diffX;

    this.setState({ _currentOffsetX: diffX });

    if (this.props.size < Math.abs(translateX)) return;

    if (Math.abs(diffX) > 20) {
      let orientedDiffX = diffX * this.state._orientation;

      if (this.state.opened && orientedDiffX > 0 || !this.state.opened &&
      orientedDiffX < 0) {
        return;
      }

      if (orientedDiffX <= 0) {
        translateX = diffX + this.props.size * this.state._orientation;
        this.setState({ _opening: false });
      }

      this.setState({
        _moved: true,
        _opening: true,
        _transform: buildTranslate3d(translateX),
        _translateX: translateX
      });
    }
  }

  open() {
    this.setTransition();
    this.translateXTo(this.state._translateTo);
    this.setState({
      opened: true
    });

    let newState = {
      _moved: false,
      _transition: ''
    };

    window.setTimeout(() => {
      this.setState(newState);
    }, this.props.duration + 50);
  }

  preventMove(e) {
    if (this.state._moved) {
      e.preventDefault();
    }
  }

  resetTouchFn(e) {
    if (!e.touches) return;

    const { side, touch, touchSize } = this.props;
    const clientX = e.touches[0].clientX;
    const clientWidth = this._wrapper.clientWidth;
    const isOpen = this.isOpen();
    const isLeft = (side === LEFT);
    const isRight = (side === RIGHT);

    const _preventOpen =
      (!touch) || (!isOpen && touchSize !== 0 && (
        (isLeft && clientX > touchSize) ||
        (isRight && clientX < clientWidth - touchSize)
      ));

    this.setState({
      _moved: false,
      _opening: false,
      _preventOpen: _preventOpen,
      _startOffsetX: e.touches[0].pageX
    });
  }

  setTransition() {
    this.setState({
      _transition: buildTransform(this.props.duration, this.props.fx)
    });
  }

  translateXTo(translateX) {
    this.setState({
      _currentOffsetX: translateX,
      _transform: buildTranslate3d(translateX),
      _translateX: translateX
    });
  }

  render() {
    const { children, bar, mode, side, size, topBar } = this.props;
    const { _currentOffsetX, _moved, _opening, _transition, _transform,
      _translateX } = this.state;
    const barStyle = Object.assign({}, MENU_DEFAULT_STYLE, { width: size });

    if (side === RIGHT) {
      delete barStyle.left;
      barStyle.right = 0;
    }

    if (~[PUSH, OVER].indexOf(mode)) {
      delete barStyle.left;
      delete barStyle.right;

      let _transformMode = buildTranslate3d(_translateX - size);

      if (side === RIGHT) {
        const end = this._wrapper.clientWidth + _translateX;

        _transformMode = buildTranslate3d(end);
      }

      extendWithPrefix(barStyle, 'Transition', _transition);
      extendWithPrefix(barStyle, 'Transform', _transformMode);
      barStyle.zIndex = 2;
    }

    const panelStyle = Object.assign({}, PANEL_DEFAULT_STYLE);

    if (mode !== OVER) {
      extendWithPrefix(panelStyle, 'Transition', _transition);
      extendWithPrefix(panelStyle, 'Transform', _transform);
    }

    const veilStyle = Object.assign({}, VEIL_DEFAULT_STYLE,
      this.props.veilStyle, VEIL_INITIAL_STYLE,
      { opacity: this.getVeilOpacity() });

    const wrapperStyle = {};

    if (this.isOpen() || _moved) {
      panelStyle.overflow = 'hidden';
      wrapperStyle.overflow = 'hidden';
    }

    // Build props for bar
    const contentProps = {
      className: 'side-bar-content',
      style: CONTENT_DEFAULT_STYLE
    };

    // Build props for bar
    const barProps = {
      className: 'side-bar',
      style: barStyle
    };

    // Build props for panel
    const panelProps = {
      className: 'side-bar-panel',
      style: panelStyle,
      onTouchStart: this.resetTouchFn.bind(this),
      onTouchCancel: this.onTouchCancelFn.bind(this),
      onTouchEnd: this.onTouchEndFn.bind(this),
      onTouchMove: this.onTouchMoveFn.bind(this),
      ref: (comp => (this._panel = comp))
    };

    const topBarProps = {
      className: 'side-bar-topBar'
    };

    // Build props for veil
    const veilProps = {
      style: veilStyle,
      onClick: this.handleClickPanel.bind(this)
    };

    // Build props for wrapper
    const wrapperProps = {
      ref: (comp => (this._wrapper = comp)),
      style: wrapperStyle
    };

    return (
      <div {...wrapperProps}>
        { topBar && <div {...topBarProps}>{topBar}</div> }
        <div {...contentProps}>
          <div {...barProps}>{ bar }</div>
          <div {...panelProps}>
            { (_currentOffsetX !== 0 || _opening) && <div {...veilProps} /> }
            { children }
          </div>
        </div>
      </div>
    );
  }
}

SideBar.propTypes = {
  children: React.PropTypes.array,
  bar: React.PropTypes.element.isRequired,
  duration: React.PropTypes.number,
  fx: React.PropTypes.string,
  mode: React.PropTypes.string,
  onClose: React.PropTypes.func,
  onOpen: React.PropTypes.func,
  opened: React.PropTypes.bool,
  tolerance: React.PropTypes.number,
  touch: React.PropTypes.bool,
  touchSize: React.PropTypes.number,
  size: React.PropTypes.number,
  side: React.PropTypes.string,
  topBar: React.PropTypes.any,
  veilStyle: React.PropTypes.object
};

SideBar.defaultProps = {
  duration: 150,
  fx: 'cubic-bezier(0, 1, 0.85, 1)',
  mode: OVER,
  opened: false,
  side: LEFT,
  size: 256,
  tolerance: 70,
  touch: true,
  touchSize: 80,
  veilStyle: {}
};

SideBar.MODES = { BEHIND, OVER, PUSH };

SideBar.SIDES = { LEFT, RIGHT };

export default SideBar;
