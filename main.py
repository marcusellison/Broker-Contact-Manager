import os.path

import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web

import pymongo

from tornado.options import define, options

define("port", default=8000, help="run on the given port", type=int)

class Application(tornado.web.Application):
	def __init__(self):
		handlers=[
			(r'/', MainHandler),
			(r'/index', ContactHandler)
			#(r'/payment', PaymentHandler)
		]
		settings= dict(
		template_path=os.path.join(os.path.dirname(__file__), "templates"),
		static_path=os.path.join(os.path.dirname(__file__), "static"),
		debug=True,
		)
		conn = pymongo.Connection("localhost", 27017)
		self.db = conn["contract_manager"]
		tornado.web.Application.__init__(self, handlers, **settings)


class MainHandler(tornado.web.RequestHandler):
	def get(self):
		self.render("main.html",
		title = "Contact Manager",
		header = "Real Estate Broker's Contact Manager"
		)
		
class ContactHandler(tornado.web.RequestHandler):
	def get(self):
		coll = self.application.db.contact
		contacts = coll.find()
		self.render(
			"index.html",
			title = "Contact Manager",
			header = "Real Estate Broker's Contact Manager",
			contacts = contacts
		)
	def post(self):
		import time
		contact_fields = ['name', 'email']
		coll= self.application.db.contact
		contacts = dict()
		for key in contact_fields:
			contacts[key] = self.get_argument(key, None)
		contacts['date_created'] = int(time.time())
		coll.insert(contacts)
		self.redirect("/index")
		
#class PaymentHandler(tornado.web.RequestHandler):
#	def post(self):
#		payment_fields = ['id', 'card', 'created' , 'currency', 'livemode', 'object', 'used']
#		coll = self.application.db.contact
#		contacts = dict()
		
if __name__=='__main__':
	tornado.options.parse_command_line()
	http_server = tornado.httpserver.HTTPServer(Application())
	http_server.listen(options.port)
	tornado.ioloop.IOLoop.instance().start()