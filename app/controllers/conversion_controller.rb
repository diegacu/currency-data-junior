# For the documentation check http://sinatrarb.com/intro.html
class ConversionController < Sinatra::Base
	
	# This configuration part will inform the app where to search for the views and from where it will serve the static files
  	configure do
    	set :views, "app/views"
    	set :public_dir, "app/public"
  	end

  	get '/' do
		   erb :index
	end

	get '/conversion' do
		conversions = Conversion.all
		@conversions = conversions
		erb :table
	end
	
	post '/run' do

		params = JSON.parse(request.env["rack.input"].read)
		amount = params["amount"].to_f
		from_currency = params["from_currency"].to_s
		to_currency = params["to_currency"].to_s
		result = Money.new(amount*100, from_currency).exchange_to(to_currency).to_f

		conversion = Conversion.new
		conversion.from_quantity = amount
		conversion.to_quantity = result
		conversion.from_currency = from_currency
		conversion.to_currency = to_currency

		if (conversion.save)
			return result.to_s
		else
			return "ERROR SOMETHING WENT WRONG"
		end

	end

	error do
		'An error occured: ' + request.env['sinatra.error'].message
	end


end