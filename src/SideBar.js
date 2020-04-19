/* eslint-disable no-bitwise */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useRef } from 'react';
import decouple from 'decouple';
import PropTypes from 'prop-types';

const CONTENT_DEFAULT_STYLE = {
  position: 'relative',
};

const MENU_DEFAULT_STYLE = {
  bottom: 0,
  left: 0,
  MozOverflowScrolling: 'touch',
  OOverflowScrolling: 'touch',
  overflowScrolling: 'touch',
  overflowY: 'auto',
  position: 'absolute',
  top: 0,
  WebkitOverflowScrolling: 'touch',
  zIndex: 0,
};

const PANEL_DEFAULT_STYLE = {
  position: 'relative',
  zIndex: 1,
};

const VEIL_INITIAL_STYLE = {
  bottom: 0,
  left: 0,
  position: 'absolute',
  right: 0,
  top: 0,
};

const VEIL_DEFAULT_PROPS = {
  opacity: 0.5,
};

const VEIL_DEFAULT_STYLE = {
  backgroundColor: 'black',
};

// Definition of modes
const BEHIND = 'behind';
const OVER = 'over';
const PUSH = 'push';

// Definition of sides
const LEFT = 'left';
const RIGHT = 'right';

const buildTransform = (duration, fx) => `transform ${duration}ms ${fx}`;

const buildTranslate3d = (translateX) => `translate3d(${translateX}px, 0, 0)`;

const prefixes = ['Moz', 'ms', 'O', 'WebKit'];

const extendWithPrefix = (object = {}, property, value) => {
  const prefixObj = {};

  prefixObj[property.toLowerCase()] = value;
  prefixes.forEach((prefix) => {
    prefixObj[prefix + property] = value;
  });

  return Object.assign(object, prefixObj);
};

const SideBar = ({
  bar,
  children,
  duration,
  fx,
  mode,
  onClose,
  onOpen,
  opened: openedFromProps,
  side,
  size,
  tolerance,
  topBar,
  touch,
  touchSize,
  veilStyle,
}) => {
  const _wrapper = useRef(null);
  const _panel = useRef(null);
  const getOrientation = (barSide = side) => (barSide === LEFT ? 1 : -1);
  const [state, setState] = useState({
    _alpha: veilStyle.opacity || VEIL_DEFAULT_PROPS.opacity,
    _currentOffsetX: 0,
    _moved: false,
    _opening: false,
    _orientation: getOrientation(),
    _preventOpen: false,
    _scrolling: false,
    _scrollTimeout: null,
    _startOffsetX: 0,
    _transform: '',
    _transition: '',
    _translateTo: getOrientation() * parseInt(size, 10),
    _translateX: 0,
    opened: openedFromProps,
  });
  const getVeilOpacity = () => {
    let opacity = 0;

    if (state._startOffsetX < size) {
      opacity = 0;

      if (state._currentOffsetX > 0) {
        opacity = (state._currentOffsetX * state._alpha) / size;
      }
    } else {
      opacity = state._alpha;

      if (state._currentOffsetX <= 0) {
        opacity = ((size + state._currentOffsetX) * state._alpha) / size;
      }
    }

    if (opacity > state._alpha) {
      opacity = state._alpha;
    }

    if (side === RIGHT) {
      opacity = (state._alpha - opacity);
    }

    return opacity;
  };
  const isOpen = () => state.opened;
  const onScrollFn = () => (
    decouple(
      window.document,
      'scroll',
      () => {
        if (!state._moved) {
          window.clearTimeout(state._scrollTimeout);
          setState((prevState) => ({
            ...prevState,
            _scrolling: true,
          }));

          const timeout = window.setTimeout(
            () => {
              setState((prevState) => ({
                ...prevState,
                _scrolling: false,
              }));
            },
            250,
          );

          setState((prevState) => ({
            ...prevState,
            _scrollTimeout: timeout,
          }));
        }
      },
    )
  );
  const onTouchCancelFn = () => {
    setState((prevState) => ({
      ...prevState,
      _moved: false,
      _opening: false,
    }));
  };
  const preventMove = (e) => {
    if (state._moved) {
      e.preventDefault();
    }
  };
  const setTransition = () => {
    setState((prevState) => ({
      ...prevState,
      _transition: buildTransform(duration, fx),
    }));
  };

  const translateXTo = (translateX) => {
    setState((prevState) => ({
      ...prevState,
      _currentOffsetX: translateX,
      _transform: buildTranslate3d(translateX),
      _translateX: translateX,
    }));
  };
  const close = () => {
    if (isOpen() || state._opening) {
      setTransition();
      translateXTo(0);

      window.setTimeout(
        () => {
          setState((prevState) => ({
            ...prevState,
            _moved: false,
            _opening: false,
            _transform: '',
            _transition: '',
            _translateX: 0,
            opened: false,
          }));
        },
        duration + 50,
      );
    }
  };
  const open = () => {
    setTransition();
    translateXTo(state._translateTo);

    setState((prevState) => ({
      ...prevState,
      opened: true,
    }));

    window.setTimeout(
      () => {
        setState((prevState) => ({
          ...prevState,
          _moved: false,
          _transition: '',
        }));
      },
      duration + 50,
    );
  };
  const onTouchEndFn = () => {
    if (state._moved) {
      if (
        state._opening
        && tolerance < (state._orientation * state._currentOffsetX)
      ) {
        open();

        if (onOpen) {
          onOpen();
        }
      } else {
        close();

        if (onClose) {
          onClose();
        }
      }

      setState((prevState) => ({
        ...prevState,
        _opening: false,
      }));
    }
  };
  const onTouchMoveFn = (event) => {
    if (
      !state._scrolling
      && !state._preventOpen
      && event.touches
      && event.touches.length > 0
    ) {
      const diffX = event.touches[0].clientX - state._startOffsetX;
      let translateX = diffX;

      setState((prevState) => ({
        ...prevState,
        _currentOffsetX: diffX,
      }));

      if (size >= Math.abs(translateX) && Math.abs(diffX) > 20) {
        const orientedDiffX = diffX * state._orientation;

        if (
          !(state.opened && orientedDiffX > 0)
          && !(!state.opened && orientedDiffX < 0)
        ) {
          if (orientedDiffX <= 0) {
            translateX = diffX + size * state._orientation;

            setState((prevState) => ({
              ...prevState,
              _opening: false,
            }));
          }

          setState((prevState) => ({
            ...prevState,
            _moved: true,
            _opening: true,
            _transform: buildTranslate3d(translateX),
            _translateX: translateX,
          }));
        }
      }
    }
  };
  const resetTouchFn = (event) => {
    if (event.touches && event.touches.length > 0) {
      const { clientX, pageX } = event.touches[0];
      const { clientWidth } = _wrapper.current;
      const isLeft = (side === LEFT);
      const isRight = (side === RIGHT);
      const _preventOpen = (
        !touch
        || (
          !isOpen()
          && touchSize !== 0
          && (
            (isLeft && clientX > touchSize)
            || (isRight && clientX < clientWidth - touchSize)
          )
        )
      );

      setState((prevState) => ({
        ...prevState,
        _moved: false,
        _opening: false,
        _preventOpen,
        _startOffsetX: pageX,
      }));
    }
  };

  useEffect(
    () => {
      onScrollFn();
      window.document.addEventListener('touchmove', preventMove);
    },
    [],
  );

  useEffect(
    () => {
      if (openedFromProps) {
        open();
      } else {
        close();
      }
    },
    [openedFromProps],
  );

  useEffect(
    () => {
      setState((prevState) => ({
        ...prevState,
        _translateTo: getOrientation() * parseInt(size, 10),
      }));
    },
    [size],
  );

  useEffect(
    () => {
      setState((prevState) => ({
        ...prevState,
        _orientation: getOrientation(side),
        _translateTo: getOrientation(side) * parseInt(size, 10),
      }));
    },
    [side],
  );

  const handleClickPanel = () => {
    if (!state._opening) {
      close();

      if (onClose) {
        onClose();
      }
    }
  };

  let barStyle = { ...MENU_DEFAULT_STYLE, width: size };

  if (side === RIGHT) {
    delete barStyle.left;

    barStyle.right = 0;
  }

  if (~[PUSH, OVER].indexOf(mode)) {
    delete barStyle.left;
    delete barStyle.right;

    let _transformMode = buildTranslate3d(state._translateX - size);

    if (side === RIGHT && _wrapper.current) {
      const end = _wrapper.current.clientWidth + state._translateX;

      _transformMode = buildTranslate3d(end);
    }

    barStyle = extendWithPrefix(barStyle, 'Transition', state._transition);
    barStyle = extendWithPrefix(barStyle, 'Transform', _transformMode);
    barStyle.zIndex = 2;
  }

  let panelStyle = { ...PANEL_DEFAULT_STYLE };

  if (mode !== OVER) {
    panelStyle = extendWithPrefix(panelStyle, 'Transition', state._transition);
    panelStyle = extendWithPrefix(panelStyle, 'Transform', state._transform);
  }

  const wrapperStyle = {};

  if (isOpen() || state._moved) {
    panelStyle.overflow = 'hidden';
    wrapperStyle.overflow = 'hidden';
  }

  return (
    <div
      ref={_wrapper}
      style={wrapperStyle}
    >
      {topBar && (
        <div className="side-bar-topBar">
          {topBar}
        </div>
      )}
      <div
        className={`side-bar-content${isOpen() ? ' opened' : ' closed'}`}
        style={CONTENT_DEFAULT_STYLE}
      >
        <div
          className="side-bar"
          style={barStyle}
        >
          {bar}
        </div>
        <div
          className="side-bar-panel"
          onTouchCancel={onTouchCancelFn}
          onTouchEnd={onTouchEndFn}
          onTouchMove={onTouchMoveFn}
          onTouchStart={resetTouchFn}
          ref={_panel}
          style={panelStyle}
        >
          {(state._currentOffsetX !== 0 || state._opening) && (
            <div
              className="side-bar-veil"
              onClick={handleClickPanel}
              style={{
                ...VEIL_DEFAULT_STYLE,
                ...veilStyle,
                ...VEIL_INITIAL_STYLE,
                opacity: getVeilOpacity(),
              }}
            />
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

SideBar.propTypes = {
  bar: PropTypes.element.isRequired,
  children: PropTypes.array.isRequired,
  duration: PropTypes.number,
  fx: PropTypes.string,
  mode: PropTypes.string,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  opened: PropTypes.bool,
  side: PropTypes.string,
  size: PropTypes.number,
  tolerance: PropTypes.number,
  topBar: PropTypes.any,
  touch: PropTypes.bool,
  touchSize: PropTypes.number,
  veilStyle: PropTypes.object,
};

SideBar.defaultProps = {
  duration: 150,
  fx: 'cubic-bezier(0, 1, 0.85, 1)',
  mode: OVER,
  onClose: null,
  onOpen: null,
  opened: false,
  side: LEFT,
  size: 256,
  tolerance: 70,
  topBar: null,
  touch: true,
  touchSize: 80,
  veilStyle: {},
};

SideBar.MODES = {
  BEHIND,
  OVER,
  PUSH,
};

SideBar.SIDES = {
  LEFT,
  RIGHT,
};

export default SideBar;
