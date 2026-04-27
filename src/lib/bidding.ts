
import { Bid, Project } from './types';

// Get all bids for a specific project from a list of all bids
export const getBidsForProject = (allBids: Bid[], projectId: string): Bid[] => {
  return allBids.filter((bid) => bid.projectId === projectId);
};

// Get the bidding history for a project, sorted by latest first
export const getBidHistory = (allBids: Bid[], projectId: string): Bid[] => {
  const projectBids = getBidsForProject(allBids, projectId);
  // Sort by latest first
  return [...projectBids].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

/**
 * A pure function to handle the logic of placing a new bid.
 * It takes the current state and returns the new state without any side-effects.
 * @param currentBids The existing array of bids.
 * @param projects The array of all projects.
 * @param newBidDetails The details of the new bid to be placed.
 * @returns An object containing the result, a message, and the new array of bids.
 */
export const placeBid = (
  currentBids: Bid[],
  projects: Project[],
  newBidDetails: Omit<Bid, 'id' | 'createdAt' | 'status'>
): { success: boolean; message: string; bids: Bid[] } => {
  const { projectId, amount } = newBidDetails;
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return { success: false, message: 'Project not found', bids: currentBids };
  }

  const projectBids = getBidsForProject(currentBids, projectId);
  const currentLowestBid = projectBids.find((bid) => bid.status === 'pending');

  // Case 1: This is the first bid for the project.
  if (!currentLowestBid) {
    const newBid: Bid = {
      ...newBidDetails,
      id: `bid-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    return {
      success: true,
      message: 'Bid placed successfully. It is the first bid!',
      bids: [...currentBids, newBid],
    };
  }

  // Case 2: Subsequent bids must be lower than the current pending bid.
  if (amount >= currentLowestBid.amount) {
    return {
      success: false,
      message: `Your bid must be lower than the current lowest bid of $${currentLowestBid.amount}.`,
      bids: currentBids, // Return original bids, as the action was rejected
    };
  }

  // Case 3: A valid, lower bid is placed.
  const newBid: Bid = {
    ...newBidDetails,
    id: `bid-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'pending',
  };

  // Invalidate the old pending bid and create a new bids array.
  const updatedBids = currentBids.map((bid) => {
    if (bid.id === currentLowestBid.id) {
      return { ...bid, status: 'invalid' as const };
    }
    return bid;
  });

  return {
    success: true,
    message: 'New lowest bid placed successfully.',
    bids: [...updatedBids, newBid],
  };
};
