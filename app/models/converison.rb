class Conversion
	include DataMapper::Resource
	property :id,               Serial    # An auto-increment integer key
    property :from_quantity,    Float    
    property :from_currency,    String
    property :to_quantity,      Float
    property :to_currency,      String
end

DataMapper.auto_upgrade!