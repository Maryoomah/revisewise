export function getAssignmentStatus(
  assignmentId: string,
  submissions: any[]
) {
  const submission = submissions.find(
    (submission) => submission.assignment_id === assignmentId
  );

  if (!submission) {
    return {
      label: "Not submitted",
      className: "bg-gray-100 text-gray-600",
    };
  }

  if (submission.feedback) {
    return {
      label: "Feedback available",
      className: "bg-green-100 text-green-700",
    };
  }

  if (submission.status === "submitted") {
    return {
      label: "Awaiting feedback",
      className: "bg-yellow-100 text-yellow-700",
    };
  }

  return {
    label: "Not submitted",
    className: "bg-gray-100 text-gray-600",
  };
}