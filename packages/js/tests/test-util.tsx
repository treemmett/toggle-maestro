import React, { render, RenderOptions } from '@testing-library/react';
import { FC, PropsWithChildren, ReactElement } from 'react';
import { MaestroProvider } from '../src/MaestroProvider';

const accessToken = process.env.ACCESS_TOKEN as string;

const AllTheProviders: FC<PropsWithChildren> = ({ children }) => (
  <MaestroProvider accessToken={accessToken}>{children}</MaestroProvider>
);

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
