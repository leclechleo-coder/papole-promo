import sys,asyncio,subprocess,time
from playwright.async_api import async_playwright
async def main(name,out,holo=None,scale=3):
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
        pg=await b.new_page(viewport={'width':560,'height':900},device_scale_factor=scale)
        url=f'http://127.0.0.1:8766/_promo_carte.html?n={name}'+(f'&holo={holo}' if holo else '')
        await pg.goto(url); await pg.wait_for_timeout(1500)
        await pg.evaluate("document.fonts.ready")
        el=await pg.query_selector('.card')
        await el.screenshot(path=out,omit_background=True)
        print(await pg.evaluate("(()=>{const r=document.querySelector('.card').getBoundingClientRect();return [r.width,r.height]})()"))
        await b.close()
asyncio.run(main(sys.argv[1],sys.argv[2],sys.argv[3] if len(sys.argv)>3 else None))
