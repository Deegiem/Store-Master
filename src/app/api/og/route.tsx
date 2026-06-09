// src/app/api/og/route.tsx
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  // Get query parameters from the URL
  const searchParams = request.nextUrl.searchParams;
  const title = searchParams.get('title') || 'StoreMaster';
  const date = searchParams.get('date') || new Date().toLocaleDateString();
  const revenue = searchParams.get('revenue') || '₦0';
  const sales = searchParams.get('sales') || '0';
  const userName = searchParams.get('user') || 'Admin';

  // Fallback static image if needed (for social media crawlers)
  const isCrawler = request.headers.get('user-agent')?.includes('facebook') || 
                    request.headers.get('user-agent')?.includes('twitter') ||
                    request.headers.get('user-agent')?.includes('whatsapp');

  // For crawlers, return a simple static version
  if (isCrawler && !title && !revenue) {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #003e9d 0%, #0050c9 100%)',
          }}
        >
          <div style={{ fontSize: '60px', fontWeight: 'bold', color: 'white' }}>
            StoreMaster
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #003e9d 0%, #0050c9 100%)',
          padding: '60px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Logo/Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              fontSize: '56px',
              marginRight: '20px',
            }}
          >
            📦
          </div>
          <div
            style={{
              fontSize: '44px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            StoreMaster
          </div>
        </div>

        {/* Dynamic Title */}
        <div
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: '40px',
            background: 'rgba(255,255,255,0.1)',
            padding: '20px 40px',
            borderRadius: '20px',
          }}
        >
          {title}
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: 'flex',
            gap: '40px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              background: 'rgba(255,255,255,0.15)',
              padding: '20px 40px',
              borderRadius: '16px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '20px', color: '#a5d8ff', marginBottom: '8px' }}>Revenue</div>
            <div style={{ fontSize: '44px', fontWeight: 'bold', color: 'white' }}>{revenue}</div>
          </div>
          <div
            style={{
              background: 'rgba(255,255,255,0.15)',
              padding: '20px 40px',
              borderRadius: '16px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '20px', color: '#a5d8ff', marginBottom: '8px' }}>Sales</div>
            <div style={{ fontSize: '44px', fontWeight: 'bold', color: 'white' }}>{sales}</div>
          </div>
        </div>

        {/* Mini Chart */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'flex-end',
            height: '120px',
            marginBottom: '30px',
          }}
        >
          {[45, 70, 55, 85, 65, 90, 75].map((height, i) => (
            <div
              key={i}
              style={{
                width: '50px',
                height: `${height}px`,
                background: '#60a5fa',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                paddingBottom: '8px',
                color: 'white',
                fontSize: '12px',
              }}
            >
              {height}%
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255,255,255,0.2)',
            color: '#a5d8ff',
            fontSize: '14px',
          }}
        >
          <div>Welcome back, {userName}</div>
          <div>📅 {date}</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}