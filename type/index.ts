import yup from 'yup';
export interface SignupShemeType {
  username: string;
  nickname: yup.Maybe<string | undefined>;
  password: string;
  confirmPassword: yup.Maybe<string | undefined>;
}

export interface APIError {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details: any;
  };
}

export interface BeerListType {
  attributes: {
    company: string;
    createdAt: string;
    description: string;
    name: string;
    publishedAt: string;
    type: string;
    updatedAt: string;
    people: number;
    rating: number;
    beer_ratings?: {
      data: BeerRatingType[];
    };
    thumbnail: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
  id: number;
}

export interface BeerRatingType {
  attributes: {
    createdAt: string;
    publishedAt: string;
    rating: number;
    updatedAt: string;
    user: {
      data: {
        id: number;
        attributes: {
          username: string;
          email: string;
          provider: string;
          confirmed: number;
          blocked: number;
          nickname: string;
          createdAt: string;
          updatedAt: string;
          profile: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
        };
      };
    };
  };
  id: number;
}

export interface BeerDetailType {
  id: number;
  attributes: {
    company: string;
    createdAt: string;
    description: string;
    name: string;
    publishedAt: string;
    type: string;
    updatedAt: string;
    people: number;
    rating: number;
    beer_ratings: {
      data: BeerRatingType[];
    };
    thumbnail: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

export interface BeerRecomendType {
  id: number;
  name: string;
  type: string;
  company: string;
  description: string;
  rating: number;
  people: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  thumbnail: {
    url: string;
  };
}

export interface BeerReviewRatingListType {
  id: number;
  attributes: {
    rating: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    user: {
      data: {
        id: number;
        attributes: {
          username: string;
          email: string;
          provider: string;
          confirmed: boolean;
          blocked: boolean;
          nickname: string;
          createdAt: string;
          updatedAt: string;
          profile: {
            data: {
              id: number;
              attributes: {
                url: string;
              };
            };
          };
        };
      };
    };
  };
}

export interface UserInfoType {
  id: number;
  username: string;
  nickname: string;
}
