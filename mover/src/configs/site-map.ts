const sm = {
  portal: {
    user: {
      moves: {
        book: {
          url: `/portal/user/moves/book/`,
        },
        index: {
          url: `/portal/user/moves/`,
        },
        draft: {
          url: `/portal/user/moves/draft/`,
        },
        upcoming: {
          url: `/portal/user/moves/upcoming/`,
        },
        past: {
          url: `/portal/user/moves/past/`,
        },
        details: {
          url: `/portal/user/moves/[move-id]`,
          navLink: (moveId: number | string) => `/portal/user/moves/${moveId}`,
        },
        pay: {
          url: `/portal/user/moves/[move-id]/pay`,
          navLink: (moveId: number | string) =>
            `/portal/user/moves/${moveId}/pay`,
        },
        track: {
          url: `/portal/user/moves/[move-id]/track`,
          navLink: (moveId: number | string) =>
            `/portal/user/moves/${moveId}/track`,
        },
      },
    },
    mover: {
      moves: {
        index: {
          url: `/portal/mover/moves/`,
        },
        upcoming: {
          url: `/portal/mover/moves/upcoming/`,
        },
        past: {
          url: `/portal/mover/moves/past/`,
        },
        my: {
          url: `/portal/mover/moves/my-moves/`,
        },
        details: {
          url: `/portal/mover/moves/[move-id]`,
          navLink: (moveId: number | string) => `/portal/mover/moves/${moveId}`,
        },
      },
    },
  },
} as const;

export default sm;
