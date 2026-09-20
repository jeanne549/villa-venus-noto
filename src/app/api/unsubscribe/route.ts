import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  const lang = req.nextUrl.searchParams.get('lang') ?? 'fr'

  if (!token) {
    return new NextResponse('Token manquant', { status: 400 })
  }

  const messages: Record<string, string> = {
    fr: '✅ Désinscription confirmée. Vous ne recevrez plus de simulations de séjour de notre part.',
    en: '✅ Unsubscribed. You will no longer receive stay simulations from us.',
    it: '✅ Disiscrizione confermata. Non riceverete più simulazioni di soggiorno da noi.',
  }
  const safeLang = ['fr', 'en', 'it'].includes(lang) ? lang : 'fr'

  return new NextResponse(
    `<!DOCTYPE html><html lang="${safeLang}"><head><meta charset="UTF-8"><title>Désinscription</title></head><body style="font-family:sans-serif;max-width:480px;margin:80px auto;padding:24px;text-align:center;color:#2C2C2C">
      <p style="font-size:24px">Villa Vénus Noto</p>
      <p style="color:#555;line-height:1.7">${messages[safeLang]}</p>
      <a href="https://www.villavenusnoto.com/${safeLang}" style="display:inline-block;margin-top:24px;background:#C8963E;color:white;padding:12px 28px;text-decoration:none;font-size:12px;letter-spacing:2px;text-transform:uppercase">Retour au site</a>
    </body></html>`,
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  )
}
