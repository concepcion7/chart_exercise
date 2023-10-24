# chart

    Product req: "per month for the past 1 year"
    Histogram:
    f(x) = y
    where x = bucket = moment of time = minimum interval
    f(x): total pr updated that in that moment of time


    Because the api limits and truncates the result to elements that fit into 100kb and since I only need the total_count in each request.
    I will do N requests. One request = one bucket (one minimum division of the date range)
    In the base case I will do 12 requests => (product req: "per month for the past 1 year"). Division: month. Range: 1 Year. 12 months in 1 year.
    Types of buckets: 1D, 1W, 1M,
    Other examples:
    Type of bucket: 1D, Range: 1 Year. Number of buckets (requests): 365.
    Type of bucket: 1W: Range: 1 month. Buckets: 4.


    Note: you need a OAuth App Token to avoid rate limiting. If you do not use any kind of token you have 10 requests. With PAT, you have 30 requests.
