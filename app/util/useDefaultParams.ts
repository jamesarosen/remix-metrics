import { useLocation, useNavigate } from "@remix-run/react";
import { useEffect, useMemo } from "react";

type StringMap = { [key: string]: string };

/**
 * Applies default query-params, using history.replaceState to replace the
 * current path & query with a new one with the defaults applied explicitly.
 * 
 * @example
 * function Foo() {
 *   const { bar } = useDefaultParams({ bar: 'baz' })
 *   return <div>Foo: bar={bar}</div>
 * }
 * A user who goes to `/foo` will be redirected to `/foo?bar=baz`.
 * A user who goes to `/foo?bar=quux` will see "Foo: bar=quux"
 * 
 * @param defaults
 * @return params with defaults applied
 */
export default function useDefaultParams<T>(defaults: T): T {
  const location = useLocation();
  const navigate = useNavigate();
  const search = useMemo(() => new URLSearchParams(location.search), [location.search]);

  useEffect(() => {
    let needsReplace = false;

    Object.entries(defaults).forEach(([key, value]) => {
      if (search.has(key)) return;

      needsReplace = true;
      search.set(key, value);
    });

    if (needsReplace) {
      navigate(`${location.pathname}?${search}`, { replace: true });
    }
  }, [defaults, location.pathname, navigate, search]);

  const result = Object.fromEntries(search.entries()) as unknown;

  return result as T;
}
