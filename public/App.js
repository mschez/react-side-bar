import React, { useState } from 'react';

import SideBar from '../src/SideBar';

const SideBarDemo = () => {
  const [barOpened, setBarOpened] = useState(false);
  const [duration, setDuration] = useState(150);
  const [fx, setFx] = useState('cubic-bezier(0, 1, 0.85, 1)');
  const [mode, setMode] = useState('over');
  const [side, setSide] = useState('left');
  const [size, setSize] = useState(256);
  const [tolerance, setTolerance] = useState(70);
  const [topBarIncluded, setTopBarIncluded] = useState(false);
  const [touch, setTouch] = useState(true);
  const [touchSize, setTouchSize] = useState(80);
  const { BEHIND, OVER, PUSH } = SideBar.MODES;
  const { LEFT, RIGHT } = SideBar.SIDES;
  const navIconClassName = ['nav-icon'];

  if (barOpened) {
    navIconClassName.push('open');
  }

  const bar = (
    <div className="side">
      Amazing SideBar
    </div>
  );
  const topBar = (
    <div className="topBar">
      <div className="left">
        <div
          className={navIconClassName.join(' ')}
          onClick={() => setBarOpened(!barOpened)}
        >
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="center">
        SideBar
      </div>
      <div className="right" />
    </div>
  );

  return (
    <SideBar
      bar={bar}
      duration={duration}
      fx={fx}
      mode={mode}
      onClose={() => setBarOpened(false)}
      onOpen={() => setBarOpened(true)}
      opened={barOpened}
      side={side}
      size={size}
      tolerance={tolerance}
      topBar={topBarIncluded ? topBar : null}
      touch={touch}
      touchSize={touchSize}
      veilStyle={{
        opacity: 0.4,
      }}
    >
      {!topBarIncluded && topBar}
      <div className="main">
        <section className="duration-option">
          <div className="title">
            Duration
          </div>
          <div className="explain">
            Set the duration of the opening and closing in milisecons.
            (default: 150ms)
          </div>
          <div className="option-wrapper">
            <input
              onChange={(event) => (
                setDuration(parseInt(event.target.value, 10))
              )}
              type="number"
              value={duration}
            />
            <span>ms</span>
          </div>
        </section>
        <section className="fx-option">
          <div className="title">
            FX
          </div>
          <div className="explain">
            This option allows set the effect to open the sidebar.
          </div>
          <div className="option-wrapper">
            <input
              onChange={(event) => setFx(event.target.value)}
              type="text"
              value={fx}
            />
          </div>
        </section>
        <section className="openingMode-option">
          <div className="title">
            Mode
          </div>
          <div className="explain">
            Set opening mode.
            {' '}
            <b>BEHIND</b>
            , the sidebar keep behind the
            content of the app.
            {' '}
            <b>OVER</b>
            , the sidebar opens above the
            content.
            {' '}
            <b>PUSH</b>
            , the sidebar moves the content of the app.
          </div>
          <div className="option-wrapper">
            <select
              onChange={(event) => setMode(event.target.value)}
              value={mode}
            >
              <option value={BEHIND}>{BEHIND}</option>
              <option value={OVER}>{OVER}</option>
              <option value={PUSH}>{PUSH}</option>
            </select>
          </div>
        </section>
        <section className="opened-option">
          <div className="title">
            Opened
          </div>
          <div className="explain">
            Set this option to open or close sidebar.
          </div>
          <div className="option-wrapper">
            <label htmlFor="opened-option">
              <input
                checked={barOpened}
                id="opened-option"
                onChange={() => setBarOpened(!barOpened)}
                type="checkbox"
              />
              Opened
            </label>
          </div>
        </section>
        <section className="openingSide-option">
          <div className="title">
            Side
          </div>
          <div className="explain">
            Set the side where to place the sidebar,
            {' '}
            <b>LEFT</b>
            {' '}
            or
            {' '}
            <b>RIGHT</b>
            .
          </div>
          <div className="option-wrapper">
            <select
              onChange={(event) => setSide(event.target.value)}
              value={side}
            >
              <option value={LEFT}>{LEFT}</option>
              <option value={RIGHT}>{RIGHT}</option>
            </select>
          </div>
        </section>
        <section className="size-option">
          <div className="title">
            Size
          </div>
          <div className="explain">
            Set the width of the sidebar in pixels. (default: 256px)
          </div>
          <div className="option-wrapper">
            <input
              onChange={(event) => setSize(parseInt(event.target.value, 10))}
              type="number"
              value={size}
            />
            <span>px</span>
          </div>
        </section>
        <section className="tolerance-option">
          <div className="title">
            Tolerance
          </div>
          <div className="explain">
            Set the tolerance of sidebar to decide if it has to open or close
            when you slide de sidebar (default: 70px).
          </div>
          <div className="option-wrapper">
            <input
              onChange={(event) => (
                setTolerance(parseInt(event.target.value, 10))
              )}
              type="number"
              value={tolerance}
            />
            <span>px</span>
          </div>
        </section>
        <section className="topBar-option">
          <div className="title">
            TopBar
          </div>
          <div className="explain">
            This option allows integrate the topBar of the app as part of the
            SideBar component to open the sidebar ignoring the topBar.
          </div>
          <div className="option-wrapper">
            <label htmlFor="topBar-option">
              <input
                checked={topBarIncluded}
                id="topBar-option"
                onChange={() => setTopBarIncluded(!topBarIncluded)}
                type="checkbox"
              />
              Include TopBar
            </label>
          </div>
        </section>
        <section className="touch-option">
          <div className="title">
            Touch
          </div>
          <div className="explain">
            Enable or disable touch option.
          </div>
          <div className="option-wrapper">
            <label htmlFor="touch-option">
              <input
                checked={touch}
                id="touch-option"
                onChange={() => setTouch(!touch)}
                type="checkbox"
              />
              Enable touch
            </label>
          </div>
        </section>
        {touch && (
          <section className="touchSize-option">
            <div className="title">
              TouchSize
            </div>
            <div className="explain">
              If the touch option is enabled, this option allows set the size
              of the touchable zone, depends of the side selected.
            </div>
            <div className="option-wrapper">
              <input
                onChange={(event) => (
                  setTouchSize(parseInt(event.target.value, 10))
                )}
                type="number"
                value={touchSize}
              />
              <span>px</span>
            </div>
          </section>
        )}
      </div>
    </SideBar>
  );
};

export default SideBarDemo;
