import sys,asyncio,urllib.parse
from playwright.async_api import async_playwright
async def main(p_,e_,o_,out,scale=3):
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
        pg=await b.new_page(viewport={'width':560,'height':900},device_scale_factor=scale)
        pg.on('console',lambda m: print('console:',m.text))
        pg.on('pageerror',lambda e: print('pageerror:',e))
        url='http://127.0.0.1:8766/_promo_fusion.html?'+urllib.parse.urlencode({'p':p_,'e':e_,'o':o_})
        await pg.goto(url); await pg.wait_for_timeout(2500)
        await pg.evaluate("document.fonts.ready"); await pg.wait_for_function("window.__FIT===1"); await pg.wait_for_timeout(300)
        print(await pg.evaluate("window.__FUSION"))
        el=await pg.query_selector('.card')
        await el.screenshot(path=out,omit_background=True)
        await b.close()
asyncio.run(main(*sys.argv[1:5]))
