# Setting the app envirement
ENV['SINATRA_ENV'] ||= "development"
ENV['RACK_ENV'] ||= "development"
# Add the needed requirement to boot the app
require 'bundler/setup'
require 'rubygems'
require 'data_mapper'
require 'money/bank/currencylayer_bank'
Bundler.require(:default, ENV['SINATRA_ENV'])

mclb = Money::Bank::CurrencylayerBank.new
mclb.access_key = 'f9a328797cd6fb1d177ba2cae9330af7'

mclb.update_rates
Money.default_bank = mclb

I18n.enforce_available_locales = false
I18n.config.available_locales = :en

# Setting DataMapper database connection
# Having trouble with database or you want to change the adapter ?! check https://datamapper.org/getting-started.html
DataMapper.setup(:default, 'postgres://userex:pwdex@localhost:5432/dbex')
# Loading all the files in app folder
require_all 'app'