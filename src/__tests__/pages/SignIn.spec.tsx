import React from 'react';
import {
  fireEvent,
  render,
  act,
  waitFor,
  createEvent,
} from '@testing-library/react';
import SignIn from '../../pages/SignIn';

const mockedAddToast = jest.fn();

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: jest.fn(),
    }),
  };
});

describe('SignIn Page', () => {
  it('should be able to sign in', async () => {
    const { getByLabelText, getByText } = render(<SignIn />);

    const sshdField = getByLabelText('SSHD');
    const senhaField = getByLabelText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(sshdField, { target: { value: 'x0123456' } });
    fireEvent.change(senhaField, { target: { value: 'minhasenha' } });
    act(() => {
      fireEvent.click(buttonElement);
    });

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ severity: 'success' }),
      );
    });
  });

  it('should be able to show password value', async () => {
    const { getByLabelText, getByTestId } = render(<SignIn />);

    const senhaField = getByLabelText('Senha');
    const buttonElement = getByTestId('password-visibility');

    fireEvent.change(senhaField, { target: { value: 'minhasenha' } });
    act(() => {
      fireEvent.click(buttonElement);
    });

    await waitFor(() => {
      expect(senhaField).toHaveProperty('type', 'text');
    });
  });

  it('should be able to hide password value', async () => {
    const { getByLabelText, getByTestId } = render(<SignIn />);

    const senhaField = getByLabelText('Senha');
    const buttonElement = getByTestId('password-visibility');

    fireEvent.change(senhaField, { target: { value: 'minhasenha' } });
    act(() => {
      fireEvent.click(buttonElement);
      fireEvent.click(buttonElement);
    });

    await waitFor(() => {
      expect(senhaField).toHaveProperty('type', 'password');
    });
  });

  it('should be able to not refresh the form', () => {
    const { getByTestId } = render(<SignIn />);

    const buttonElement = getByTestId('password-visibility');
    const mouseDownEvent = createEvent.mouseDown(buttonElement);

    fireEvent(buttonElement, mouseDownEvent);

    expect(mouseDownEvent.defaultPrevented).toBeTruthy();
  });
});
