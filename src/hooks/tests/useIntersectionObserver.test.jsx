import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

beforeAll(() => {
  // IntersectionObserver isn't available in test environment
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
  // global.IntersectionObserver = mockIntersectionObserver;
});

const importObserver = async () =>
  import("../useIntersectionObserver/useIntersectionObserver");

describe(`getIntersectionObserver(options?: IntersectionObserverInit): ReactiveResizeObserver`, () => {
  it(`getIntersectionObserver() === getIntersectionObserver()`, async () => {
    const { getIntersectionObserver } = await importObserver();
    expect(getIntersectionObserver()).toBe(getIntersectionObserver());
  });

  it(`getIntersectionObserver({}) === getIntersectionObserver()`, async () => {
    const { getIntersectionObserver } = await importObserver();
    expect(getIntersectionObserver({})).toBe(getIntersectionObserver());
  });

  it(`getIntersectionObserver({ rootMargin: ' 0px ' }) === getIntersectionObserver()`, async () => {
    const { getIntersectionObserver } = await importObserver();
    expect(getIntersectionObserver({ rootMargin: ' 0px ' })).toBe(getIntersectionObserver());
  });

  it(`getIntersectionObserver({ rootMargin: '' }) === getIntersectionObserver()`, async () => {
    const { getIntersectionObserver } = await importObserver();
    expect(getIntersectionObserver({ rootMargin: '' })).toBe(getIntersectionObserver());
  });

  it(`getIntersectionObserver({ rootMargin: '.0px' }) === getIntersectionObserver()`, async () => {
    const { getIntersectionObserver } = await importObserver();
    expect(getIntersectionObserver({ rootMargin: '.0px' })).toBe(getIntersectionObserver());
  });

  it(`getIntersectionObserver({ rootMargin: '0.0px' }) === getIntersectionObserver()`, async () => {
    const { getIntersectionObserver } = await importObserver();
    expect(getIntersectionObserver({ rootMargin: '0.0px' })).toBe(getIntersectionObserver());
  });

  it(`getIntersectionObserver({ rootMargin: 'any invalid rootMargin' }) === getIntersectionObserver()`, async () => {
    const { getIntersectionObserver } = await importObserver();
    expect(getIntersectionObserver({ rootMargin: 'any invalid rootMargin' })).toBe(getIntersectionObserver());
  });

  it(`getIntersectionObserver({ rootMargin: '0.9px' }) === getIntersectionObserver()`, async () => {
    const { getIntersectionObserver } = await importObserver();
    expect(getIntersectionObserver({ rootMargin: '0.9px' })).toBe(getIntersectionObserver());
  });

  it(`getIntersectionObserver({ rootMargin: '-1.9px' }) === getIntersectionObserver({ rootMargin: '-1px' })`, async () => {
    const { getIntersectionObserver } = await importObserver();
    expect(getIntersectionObserver({ rootMargin: '-1.9px' })).toBe(getIntersectionObserver({ rootMargin: '-1px' }));
  });

  it(`getIntersectionObserver({ rootMargin: '0px 0%' }) === getIntersectionObserver()`, async () => {
    const { getIntersectionObserver } = await importObserver();
    expect(getIntersectionObserver({ rootMargin: '0px 0% ' })).toBe(getIntersectionObserver());
  });

  it(`getIntersectionObserver({ rootMargin: '0px 0% 0px' }) === getIntersectionObserver()`, async () => {
    const { getIntersectionObserver } = await importObserver();
    expect(getIntersectionObserver({ rootMargin: '0px 0%  0px' })).toBe(getIntersectionObserver());
  });

  it(`getIntersectionObserver({ rootMargin: '0px 0% 0px 0%' }) === getIntersectionObserver()`, async () => {
    const { getIntersectionObserver } = await importObserver();
    expect(getIntersectionObserver({ rootMargin: '0px 0%  0px 0%' })).toBe(getIntersectionObserver());
  });

  it(`getIntersectionObserver({ rootMargin: '200px' }) !== getIntersectionObserver()`, async () => {
    const { getIntersectionObserver } = await importObserver();
    expect(getIntersectionObserver({ rootMargin: '200px' })).not.toBe(getIntersectionObserver());
  });

  it(`getIntersectionObserver({ rootMargin: '200px 200px' }) === getIntersectionObserver({ rootMargin: '200px' })`, async () => {
    const { getIntersectionObserver } = await importObserver();
    expect(getIntersectionObserver({ rootMargin: '200px 200px' })).toBe(getIntersectionObserver({ rootMargin: '200px' }));
  });

  it(`getIntersectionObserver({ root: document }) === getIntersectionObserver()`, async () => {
    const { getIntersectionObserver } = await importObserver();
    expect(getIntersectionObserver({ root: document })).toBe(getIntersectionObserver());
  });

  it(`getIntersectionObserver({ root: container }) !== getIntersectionObserver()`, async () => {
    const { getIntersectionObserver } = await importObserver();
    const Test = () => {
      const [container, setContainer] = React.useState(null);
      return <div ref={setContainer}>{getIntersectionObserver({ root: container }) !== getIntersectionObserver() ? 'true' : 'false'}</div>
    }
    render(<Test />)
    expect(screen.getByText('true')).toBeVisible();
  });

  it(`getIntersectionObserver({ root: container }) === getIntersectionObserver({ root: containerRef })`, async () => {
    const { getIntersectionObserver } = await importObserver();
    const Test = () => {
      const containerRef = React.useRef(null);
      const [container, setContainer] = React.useState(null);
      React.useEffect(() => {
        containerRef.current = container;
      }, [container])
      return <div ref={setContainer}>{getIntersectionObserver({ root: container }) === getIntersectionObserver({ root: { current: container } }) ? 'true' : 'false'}</div>
    }
    render(<Test />)
    expect(screen.getByText('true')).toBeVisible();
  });

  it(`getIntersectionObserver({ threshold: 0 }) === getIntersectionObserver()`, async () => {
    const { getIntersectionObserver } = await importObserver();
    expect(getIntersectionObserver({ threshold: 0 })).toBe(getIntersectionObserver());
  });

  it(`getIntersectionObserver({ threshold: [0] }) === getIntersectionObserver()`, async () => {
    const { getIntersectionObserver } = await importObserver();
    expect(getIntersectionObserver({ threshold: [0] })).toBe(getIntersectionObserver());
  });

  it(`getIntersectionObserver({ threshold: [] }) === getIntersectionObserver()`, async () => {
    const { getIntersectionObserver } = await importObserver();
    expect(getIntersectionObserver({ threshold: [] })).toBe(getIntersectionObserver());
  });


});
