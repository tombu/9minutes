module LastFM
  
  module Validator
    
    def self.validate_mash mash, *args
      args.flatten!
      
      return [] if mash.blank?
      
      mash.each do |key, value|
        if args.include? key.to_s || value.is_a?(Array)
          mash[key] = Array.wrap value
          mash[key].map do |mashie|
            validate_mash mashie, args
          end
        elsif value.is_a? Hashie::Mash
          mash[key] = validate_mash mash[key], args
        end
        mash[key] = "" if value.blank? && value.is_a?(String)
        mash[key] = [] if value.blank? && value.is_a?(Array)
      end
      
      return mash
    end

  end
  
end