import '@testing-library/jest-dom';
import 'whatwg-fetch';
import nock from 'nock';

const corsHeaders = {
  'Access-Control-Allow-Headers': 'authorization, user-agent',
  'Access-Control-Allow-Methods': 'PUT, OPTIONS, CONNECT, PATCH, GET, HEAD, POST, DELETE, TRACE',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Expose-Headers': 'etag, link, location',
};

nock('http://localhost:3000')
  .options('/api/manifest')
  .reply(200, '', { ...corsHeaders, Accept: 'OPTIONS, GET, POST' })
  .persist();

nock('http://localhost:3000')
  .get('/api/manifest')
  .reply(
    200,
    {
      flags: {
        'feature-1': false,
        'feature-2': true,
        'feature-3': false,
      },
      id: '64dc38a671a3ef5cb046a15496ec0b60',
    },
    corsHeaders
  )
  .persist();
