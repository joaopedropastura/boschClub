import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import RegisterTypeOfPlace from '../src/app/(protected)/admin/new-type/page';

describe('RegisterTypeOfPlace Page', () => {
  it('renders RegisterTypeOfPlaceForm', () => {
    render(<RegisterTypeOfPlace />);

    // Assumindo que o RegisterTypeOfPlaceForm tem um elemento com o texto "Register Type Of Place"
    const formElement = screen.getByText('Register Type Of Place');

    expect(formElement).toBeInTheDocument();
  });
});


