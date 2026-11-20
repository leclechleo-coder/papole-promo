# Sert les pages de rendu des cartes. Usage : python3 serve.py /chemin/vers/PAPOL-/web
# Puis render_card.py / render_fusion.py (port 8766).
import http.server,os,sys
ICI=os.path.dirname(os.path.abspath(__file__))
ROOTS=[os.path.join(ICI,'web')]+sys.argv[1:]
class H(http.server.SimpleHTTPRequestHandler):
    def translate_path(self,path):
        p=path.split('?')[0].lstrip('/') or 'index.html'
        for r in ROOTS:
            f=os.path.join(r,p)
            if os.path.isfile(f): return f
        return os.path.join(ROOTS[-1],p)
    def log_message(self,*a): pass
http.server.ThreadingHTTPServer(('127.0.0.1',8766),H).serve_forever()
