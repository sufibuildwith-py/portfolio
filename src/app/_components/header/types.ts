export type HeaderLink = {
  _id: string;
  label: string;
  href?: string | null;
  sublinks?: {
    items: HeaderSubLink[];
  };
};

export type HeaderSubLink = {
  _id: string;
  label: string;
  href?: string | null;
};

export type HeaderCTA = {
  _id: string;
  label: string;
  href?: string | null;
};

export type HeaderFragment = {
  navbar: {
    items: HeaderLink[];
  };
  rightCtas: {
    items: HeaderCTA[];
  };
};

export type HeaderLiksFragment = HeaderLink;