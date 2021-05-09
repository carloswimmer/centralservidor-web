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
const mockedSignIn = jest.fn();

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
      signIn: mockedSignIn,
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

  it('should be able to require a minimum of 8 caracters', async () => {
    const { getByLabelText, getByText } = render(<SignIn />);

    const sshdField = getByLabelText('SSHD');
    let errorMessage: HTMLElement | null;

    fireEvent.change(sshdField, { target: { value: '1234' } });
    act(() => {
      fireEvent.blur(sshdField);
    });

    await waitFor(() => {
      errorMessage = getByText('Mínimo de 8 caracteres');
      expect(sshdField).toHaveValue('1234');
      expect(errorMessage).not.toBeNull();
    });
  });

  it('should be able to validate with 8 caracters', async () => {
    const { getByLabelText, getByText } = render(<SignIn />);

    const sshdField = getByLabelText('SSHD');
    let errorMessage: HTMLElement | null;

    fireEvent.change(sshdField, { target: { value: '1234' } });
    act(() => {
      fireEvent.blur(sshdField);
    });

    await waitFor(() => {
      errorMessage = getByText('Mínimo de 8 caracteres');
    });

    fireEvent.change(sshdField, { target: { value: '12345678' } });
    act(() => {
      fireEvent.blur(sshdField);
    });

    await waitFor(() => {
      expect(sshdField).toHaveValue('12345678');
      expect(errorMessage).not.toBeInTheDocument();
    });
  });

  it('should display an error when login fails', async () => {
    mockedSignIn.mockImplementation(() => {
      throw new Error('mocked error');
    });

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
        expect.objectContaining({ text: 'mocked error' }),
      );
    });
  });
});
