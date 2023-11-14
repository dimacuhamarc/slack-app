import { render, screen } from '@testing-library/react';
import AddMember from './components/Channel/AddMembers';
import ChannelModal from './components/Channel/ChannelModal';

global.ResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('AddMember Component', () => {
  const mockOnAddMembers = jest.fn();
  const mockOnClose = jest.fn();

  test('renders AddMember component', () => {
    render(
      <AddMember isOpen={true} onClose={mockOnClose} onAddMembers={mockOnAddMembers} />
    );

    expect(screen.getByText('Channel ID:')).toBeInTheDocument();
    expect(screen.getByLabelText('Channel Member')).toBeInTheDocument();
    expect(screen.getByText('Add Member')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });
});

describe('ChannelModal Component', () => {
  const mockOnClose = jest.fn();
  const mockOnCreateChannel = jest.fn();

  test('checks if modal is closed when isOpen is false', () => {
    render(
      <ChannelModal isOpen={false} onClose={mockOnClose} onCreateChannel={mockOnCreateChannel} />
    );
    expect(screen.queryByText('Create a New Channel')).not.toBeInTheDocument();
    expect(screen.queryByText('Channel Name')).not.toBeInTheDocument();
    expect(screen.queryByText('Channel Members')).not.toBeInTheDocument();
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
  });
});